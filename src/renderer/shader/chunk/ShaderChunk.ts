/// <reference path="../../../definitions.d.ts"/>
module dy{
export class ShaderChunk{public static empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""}
public static NULL:number = -1.0;
public static mirror_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_mirrorCoord;\n",funcDeclare: "",funcDefine: "//todo which way to mix mirror color and textureColor?\n		float blendOverlay(float base, float blend) {\n			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n		}\n",body: "\n			vec4 color = texture2DProj(u_mirrorSampler, v_mirrorCoord);\n\n			color = vec4(blendOverlay(u_mirrorColor.r, color.r), blendOverlay(u_mirrorColor.g, color.g), blendOverlay(u_mirrorColor.b, color.b), 1.0);\n\n			gl_FragColor = color;\n			//gl_FragColor = vec4(v_mirrorCoord.x/v_mirrorCoord.w, v_mirrorCoord.y/v_mirrorCoord.w, 1.0, 1.0);\n\n",}
public static mirror_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_mirrorCoord;\n",funcDeclare: "",funcDefine: "",body: "\n//vec4 worldPosition = u_mMatrix * vec4( a_position, 1.0 );\ngl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n\n\nmat4 textureMatrix = mat4(\n                        0.5, 0.0, 0.0, 0.0,\n                        0.0, 0.5, 0.0, 0.0,\n                        0.0, 0.0, 0.5, 0.0,\n                        0.5, 0.5, 0.5, 1.0\n);\n\n			v_mirrorCoord = textureMatrix * gl_Position;\n\n",}
public static basic_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_color;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = v_color;\n",}
public static basic_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_color;\n",funcDeclare: "",funcDefine: "",body: "v_color = vec4(a_color, 1.0);\n",}
public static basic_envMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, v_dir);\n",}
public static basic_envMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "v_dir = a_position;\n",}
public static envMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n",funcDeclare: "",funcDefine: "",body: "vec3 inDir = normalize(v_position - u_cameraPos);\n",}
public static envMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n",funcDeclare: "",funcDefine: "",body: "v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));\n    v_position = vec3(u_mMatrix * vec4(a_position, 1.0));\n",}
public static fresnel_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){\n    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);\n    float fresnelPower = 5.0;\n    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);\n\n    return ratio / 100.0;\n}\n",body: "vec3 normal = normalize(v_normal);\n\n    vec3 reflectDir = reflect(inDir, normal);\n    vec3 refractDir = refract(inDir, normal, u_refractionRatio);\n\n    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);\n    vec4 refractColor = textureCube(u_samplerCube0, refractDir);\n\n	if(u_reflectivity != NULL){\n        gl_FragColor = mix(reflectColor, refractColor, u_reflectivity);\n	}\n	else{\n        gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));\n	}\n\n",}
public static reflection_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, reflect(inDir, normalize(v_normal)));\n",}
public static refraction_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, refract(inDir, normalize(v_normal), u_refractionRatio));\n",}
public static common_define:GLSLChunk = {top: "",define: "#define NULL -1.0\n",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static common_function:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n",body: "",}
public static common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static highp_fragment:GLSLChunk = {top: "precision highp float;\nprecision highp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static lowp_fragment:GLSLChunk = {top: "precision lowp float;\nprecision lowp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static mediump_fragment:GLSLChunk = {top: "precision mediump float;\nprecision mediump int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static buildShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 0.0);\n",}
public static diffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return vec3(texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord));\n    }\n",body: "",}
public static diffuseMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_diffuseMapTexCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n    //v_diffuseMapTexCoord = a_texCoord;\n",}
public static light_common:GLSLChunk = {top: "",define: "",varDeclare: "#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "",funcDefine: "vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n    vec3 materialDiffuse = getMaterialDiffuse();\n    vec3 materialSpecular = getMaterialSpecular();\n\n    float dotResultBetweenNormAndLight = dot(normal, lightDir);\n    float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n    float spec = 0.0;\n    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光\n    if(dotResultBetweenNormAndLight < 0.0){\n        spec = 0.0;\n    }\n    else{\n        vec3 reflectDir = reflect(-lightDir, normal);\n        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);\n    }\n\n    vec3 ambientColor = u_ambient * materialDiffuse;\n\n    vec3 diffuseColor = diff * color * materialDiffuse * intensity;\n\n    vec3 specularColor = spec * materialSpecular * intensity;\n\n    return  ambientColor + getShadowVisibility(lightDir) * attenuation * (diffuseColor + specularColor);\n}\n\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n    //lightDir is not normalize computing distance\n    float distance = length(lightDir);\n\n    float attenuation = 0.0;\n    if(distance < light.range)\n    {\n        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n    }\n\n    lightDir = normalize(lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n    float attenuation = 1.0;\n\n    lightDir = normalize(-lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvoid calcTotalLight(inout vec3 totalLight, vec3 norm, vec3 viewDir){\n    #if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);\n       }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);\n       }\n    #endif\n}\n",body: "",}
public static light_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec3 norm = normalize(getNormal());\n    vec3 viewDir = normalize(getViewDir());\n    vec3 totalLight = vec3(0, 0, 0);\n\n    calcTotalLight(totalLight, norm, viewDir);\n\n\n    gl_FragColor = vec4(totalLight, 1.0);\n\n",}
public static noDiffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n",body: "",}
public static noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return u_pointLights[x].position - v_worldPosition;\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return u_directionLights[x].direction;\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\nvec3 getNormal(){\n    return v_normal;\n}\n\n",body: "",}
public static noNormalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: "v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));\n    v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));\n",}
public static noShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getShadowVisibility(vec3 lightDir) {\n        return vec3(1.0);\n    }\n",body: "",}
public static noSpecularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialSpecular() {\n        return u_specular;\n    }\n",body: "",}
public static normalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_normalMapTexCoord;\nvarying vec3 v_viewDir;\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "",funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_pointLightDir[x];\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_directionLightDir[x];\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return v_viewDir;\n}\nvec3 getNormal(){\n        // Obtain normal from normal map in range [0,1]\n        vec3 normal = texture2D(u_normalMapSampler, v_normalMapTexCoord).rgb;\n\n        // Transform normal vector to range [-1,1]\n        return normalize(normal * 2.0 - 1.0);  // this normal is in tangent space\n}\n",body: "",}
public static normalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_normalMapTexCoord;\n	varying vec3 v_viewDir;\n\n\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "",funcDefine: "mat3 computeTBN(){\n            //vec3 T = normalize(normalMatrix * tangent);\n            //vec3 B = normalize(normalMatrix * bitangent);\n            //vec3 N = normalize(normalMatrix * normal);\n\n            vec3 T = normalize(vec3(u_normalMatrix * vec4(a_tangent, 1.0)));\n            vec3 N = normalize(vec3(u_normalMatrix * vec4(a_normal, 1.0)));\n            // re-orthogonalize T with respect to N\n            T = normalize(T - dot(T, N) * N);\n            // then retrieve perpendicular vector B with the cross product of T and N\n            vec3 B = cross(T, N);\n\n\n            return transpose(mat3(T, B, N));\n        }\n",body: "mat3 TBN = computeTBN();\n\n    //v_tangentLightPos = TBN * light.position;\n    //v_tangentCameraPos  = TBN * u_cameraPos;\n    //v_tangentPos  = TBN * v_position;\n\n\n    vec3 tangentPosition = TBN * vec3(u_mMatrix * vec4(a_position, 1.0));\n\n    v_normalMapTexCoord = a_texCoord;\n\n    v_viewDir = normalize(TBN * u_cameraPos - tangentPosition);\n\n\n#if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            //not normalize for computing distance\n            v_pointLightDir[i] = TBN * u_pointLights[i].position - tangentPosition;\n       }\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            v_directionLightDir[i] = normalize(- TBN * u_directionLights[i].direction);\n       }\n#endif\n\n",}
public static shadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_positionFromLight;\n",funcDeclare: "",funcDefine: "vec3 _getShadowBias(vec3 lightDir){\n        if(u_shadowBias != NULL){\n            return u_shadowBias;\n        }\n\n        //todo need verify\n        /*!\n        A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:\n        */\n        return max(0.05 * (1.0 - dot(getNormal(), lightDir)), 0.005);\n    }\n    vec3 getShadowVisibility(vec3 lightDir) {\n        //project texture\n        vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;\n        vec4 rgbaDepth = texture2D(u_shadowMapSampler, shadowCoord.xy);\n\n        float depth = rgbaDepth.r;\n\n        return vec3(shadowCoord.z > depth + _getShadowBias(lightDir) ? u_shadowDarkness : 1.0);\n    }\n",body: "",}
public static shadowMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_positionFromLight;\n",funcDeclare: "",funcDefine: "",body: "v_positionFromLight = u_mvpMatrixFromLight * a_position;\n",}
public static specularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialSpecular() {\n        return vec3(texture2D(u_specularMapSampler, v_specularMapTexCoord));\n    }\n",body: "",}
public static specularMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "v_specularMapTexCoord = a_texCoord;\n",}
public static map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_texCoord;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = texture2D(u_sampler2D0, v_texCoord);\n",}
public static map_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_texCoord;\n",funcDeclare: "",funcDefine: "",body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n",}
public static multi_map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec4 color0 = texture2D(u_sampler2D0, v_texCoord);\n    vec4 color1 = texture2D(u_sampler2D1, v_texCoord);\n    if(u_combineMode == 0){\n        gl_FragColor = mix(color0, color1, u_mixRatio);\n    }\n    else if(u_combineMode == 1){\n        gl_FragColor = color0 * color1;\n    }\n    else if(u_combineMode == 2){\n        gl_FragColor = color0 + color1;\n    }\n",}
public static skybox_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, v_dir);\n",}
public static skybox_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * vec4(a_position, 1.0);\n\n    gl_Position = pos.xyww;\n\n    v_dir = a_position;\n",}
}
export type GLSLChunk = {top?:string;define?:string;varDeclare?:string;funcDeclare?:string;funcDefine?:string;body?:string;}
}