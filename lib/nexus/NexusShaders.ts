export const nexusShaders = {
  hologram: {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float uTime;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        
        // Add a slight wave effect to the position
        vec3 pos = position;
        pos.x += sin(pos.y * 5.0 + uTime * 2.0) * 0.01;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform sampler2D uTexture;

      void main() {
        // Base texture color
        vec4 texColor = texture2D(uTexture, vUv);
        
        // Base holographic scanlines (very subtle)
        float scanline = sin(vPosition.y * 120.0 - uTime * 3.0) * 0.05 + 0.95;
        
        // Horizontal scanlines (very subtle)
        float hScanline = sin(vPosition.x * 15.0 + uTime) * 0.02 + 0.98;
        
        // Fresnel effect for edge glow (toned down)
        float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1)), 4.0);
        
        // Flicker effect (very subtle)
        float flicker = sin(uTime * 15.0) * 0.01 + 0.99;
        
        // Blend texture with holographic color
        // Reduced tint from 0.4 to 0.1 for high clarity
        vec3 finalColor = mix(texColor.rgb, uColor, 0.1);
        
        // Apply scanlines and fresnel more subtly to color
        float intensity = mix(1.0, scanline * hScanline + fresnel * 0.5, 0.15);
        finalColor *= intensity;
        
        // Alpha calculation - prioritize texture alpha
        float alpha = texColor.a * uOpacity * flicker;
        // Keep a bit of the scanline/fresnel look in the alpha
        alpha *= mix(1.0, (scanline * 0.8 + fresnel * 0.2), 0.2);
        
        // Vertical fade out at top/bottom (adjusted for larger visible area)
        alpha *= (1.0 - abs(vPosition.y / 0.95));
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  },
  energyField: {
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      uniform float uTime;

      void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        float elevation = sin(modelPosition.x * 3.0 + uTime) * 
                        sin(modelPosition.z * 2.0 + uTime) * 0.1;
        
        modelPosition.y += elevation;
        vElevation = elevation;
        
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vElevation;
      uniform vec3 uColor;
      uniform float uTime;

      void main() {
        float strength = vElevation * 2.0 + 0.5;
        vec3 color = mix(vec3(0.0), uColor, strength);
        
        // Add moving lines
        float lines = mod(vUv.y * 20.0 - uTime, 1.0);
        lines = step(0.9, lines) * 0.2;
        
        gl_FragColor = vec4(color + lines, 0.8);
      }
    `
  }
};
