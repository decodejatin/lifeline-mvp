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
        pos.x += sin(pos.y * 10.0 + uTime * 2.0) * 0.02;
        
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

      void main() {
        // Base holographic scanlines
        float scanline = sin(vPosition.y * 100.0 - uTime * 5.0) * 0.1 + 0.9;
        
        // Horizontal scanlines
        float hScanline = sin(vPosition.x * 10.0 + uTime) * 0.05 + 0.95;
        
        // Fresnel effect for edge glow
        float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1)), 3.0);
        
        // Flicker effect
        float flicker = sin(uTime * 20.0) * 0.05 + 0.95;
        
        // Combine everything
        vec3 finalColor = uColor * (scanline * hScanline + fresnel);
        float alpha = uOpacity * (scanline * 0.5 + fresnel * 0.8) * flicker;
        
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
