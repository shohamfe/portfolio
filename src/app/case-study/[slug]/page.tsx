import MobileProject from "@/components/mobileProject/MobileProject";
import ProjectStage from "@/components/projectStage/ProjectStage";
import { buildPageGraph } from "@/components/structuredData/helpers/structuredData.helpers";
import StructuredData from "@/components/structuredData/StructuredData";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import {
  CASE_STUDY_INDEX_HREF,
  caseStudyHref,
} from "@/constants/caseStudyPages";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { getPageLabel } from "@/constants/structuredData";
import { CASE_STUDY_PROJECTS } from "@/content/caseStudy";
import {
  getNextProject,
  getPreviousProject,
  getProject,
  PROJECT_DETAILS,
} from "@/content/projectDetail";
import { buildPageMetadata, getProjectDescription } from "@/lib/pageMetadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyPageRoot } from "../styles/caseStudyPage.variants";
import type { ProjectPageProps } from "./types/projectPage.types";

const projectTitle = (title: string): string => `${title} - ${SITE.name}`;

export const generateStaticParams = async () =>
  CASE_STUDY_PROJECTS.filter(({ id }) => id in PROJECT_DETAILS).map(
    ({ id }) => ({ slug: id }),
  );

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: `Case Study - ${SITE.name}` };

  return buildPageMetadata({
    path: caseStudyHref(slug),
    title: projectTitle(project.title),
    description: getProjectDescription(project),
  });
};

const ProjectPage = async ({ params, searchParams }: ProjectPageProps) => {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  const project = getProject(slug);
  const detail = PROJECT_DETAILS[slug];
  if (!project || !detail) notFound();

  const previousProject = getPreviousProject(slug);
  const nextProject = getNextProject(slug);
  const roleLabel = resolveRoleLabel(query[ROLE_QUERY_PARAM]);

  const path = caseStudyHref(slug);
  const graph = buildPageGraph({
    path,
    title: projectTitle(project.title),
    description: getProjectDescription(project),
    breadcrumbTrail: [
      {
        path: CASE_STUDY_INDEX_HREF,
        name: getPageLabel(CASE_STUDY_INDEX_HREF),
      },
      { path, name: project.title },
    ],
  });

  return (
    <>
      <StructuredData graph={graph} />

      <ViewportSwitch
        mobile={
          <MobileProject
            roleLabel={roleLabel}
            project={project}
            detail={detail}
            previousProject={previousProject}
            nextProject={nextProject}
          />
        }
      >
        <main id="project" className={caseStudyPageRoot}>
          <ProjectStage
            project={project}
            detail={detail}
            previousProject={previousProject}
            nextProject={nextProject}
          />
        </main>
      </ViewportSwitch>
    </>
  );
};

export default ProjectPage;
