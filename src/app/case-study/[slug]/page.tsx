import MobileProject from "@/components/mobileProject/MobileProject";
import ProjectStage from "@/components/projectStage/ProjectStage";
import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import { resolveRoleLabel, ROLE_QUERY_PARAM, SITE } from "@/constants/site";
import { CASE_STUDY_PROJECTS } from "@/content/caseStudy";
import {
  getNextProject,
  getProject,
  PROJECT_DETAILS,
} from "@/content/projectDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyPageRoot } from "../styles/caseStudyPage.variants";
import type { ProjectPageProps } from "./types/projectPage.types";

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

  return {
    title: `${project.title} - ${SITE.name}`,
    description: project.blurb,
  };
};

const ProjectPage = async ({ params, searchParams }: ProjectPageProps) => {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  const project = getProject(slug);
  const detail = PROJECT_DETAILS[slug];
  if (!project || !detail) notFound();

  const nextProject = getNextProject(slug);
  const roleLabel = resolveRoleLabel(query[ROLE_QUERY_PARAM]);

  return (
    <ViewportSwitch
      mobile={
        <MobileProject
          roleLabel={roleLabel}
          project={project}
          detail={detail}
          nextProject={nextProject}
        />
      }
    >
      <main id="project" className={caseStudyPageRoot}>
        <ProjectStage
          project={project}
          detail={detail}
          nextProject={nextProject}
        />
      </main>
    </ViewportSwitch>
  );
};

export default ProjectPage;
