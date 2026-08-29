/** Ported from the "glass" transition in
 *  https://21st.dev/@hardikkashiyani123456788/components/lumina-interactive-list -
 *  a circular reveal from the frame's centre with refraction, chromatic
 *  aberration and a liquid ripple along the wipe edge. The reference also
 *  shipped frost/ripple/plasma/timeshift "effects", but those were plain
 *  linear mixes with no real shader behind them, so only glass - the one
 *  effect actually implemented - is ported. The reference also fit each
 *  image with a cover-style crop, right for a full-bleed background slider;
 *  a lightbox needs the whole image visible, so this fits contain and
 *  leaves the letterboxed edges transparent so the modal's own backdrop
 *  shows through instead of a hard black bar. */
export const GLASS_VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const GLASS_FRAGMENT_SHADER = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  uniform float uRefractionStrength, uChromaticAberration, uBubbleClarity, uEdgeGlow, uLiquidFlow;
  varying vec2 vUv;

  vec2 getContainUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = min(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  bool isOutOfBounds(vec2 uv) {
    return uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0;
  }

  vec4 sampleContained(sampler2D tex, vec2 uv) {
    return isOutOfBounds(uv) ? vec4(0.0, 0.0, 0.0, 0.0) : texture2D(tex, uv);
  }

  void main() {
    float time = uProgress * 5.0;
    vec2 uv1 = getContainUV(vUv, uTexture1Size);
    vec2 uv2 = getContainUV(vUv, uTexture2Size);

    float maxRadius = length(uResolution) * 0.85;
    float bandRadius = uProgress * maxRadius;
    vec2 pixel = vUv * uResolution;
    vec2 center = uResolution * 0.5;
    float dist = length(pixel - center);
    float normalizedDist = dist / max(bandRadius, 0.001);
    float insideCircle = smoothstep(bandRadius + 3.0, bandRadius - 3.0, dist);

    vec4 revealed;

    if (insideCircle > 0.0) {
      float refractOffset = 0.08 * uRefractionStrength
        * pow(smoothstep(0.3 * uBubbleClarity, 1.0, normalizedDist), 1.5);
      vec2 direction = dist > 0.0 ? (pixel - center) / dist : vec2(0.0);
      vec2 distortedUv = uv2 - direction * refractOffset;
      distortedUv += vec2(sin(time + normalizedDist * 10.0), cos(time * 0.8 + normalizedDist * 8.0))
        * 0.015 * uLiquidFlow * normalizedDist * insideCircle;

      float chromatic = 0.02 * uChromaticAberration * pow(smoothstep(0.3, 1.0, normalizedDist), 1.2);
      float revealedAlpha = isOutOfBounds(uv2) ? 0.0 : 1.0;
      revealed = vec4(
        sampleContained(uTexture2, distortedUv + direction * chromatic * 1.2).r,
        sampleContained(uTexture2, distortedUv + direction * chromatic * 0.2).g,
        sampleContained(uTexture2, distortedUv - direction * chromatic * 0.8).b,
        revealedAlpha
      );

      float rim = smoothstep(0.95, 1.0, normalizedDist) * (1.0 - smoothstep(1.0, 1.01, normalizedDist));
      revealed.rgb += rim * 0.08 * uEdgeGlow;
    } else {
      revealed = sampleContained(uTexture2, uv2);
    }

    if (uProgress > 0.95) {
      revealed = mix(revealed, sampleContained(uTexture2, uv2), (uProgress - 0.95) / 0.05);
    }

    vec4 previous = sampleContained(uTexture1, uv1);
    gl_FragColor = mix(previous, revealed, insideCircle);
  }
`;
