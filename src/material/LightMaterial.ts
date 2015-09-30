/// <reference path="../definitions.d.ts"/>
module dy{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _diffuseMap:CommonTexture|CompressedTexture = null;
        get diffuseMap(){
            return this._diffuseMap;
        }
        set diffuseMap(diffuseMap:CommonTexture|CompressedTexture){
            this.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:CommonTexture|CompressedTexture = null;
        get specularMap(){
            return this._specularMap;
        }
        set specularMap(specularMap:CommonTexture|CompressedTexture){
            this.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _normalMap:CommonTexture|CompressedTexture = null;
        get normalMap(){
            return this._normalMap;
        }
        set normalMap(normalMap:CommonTexture|CompressedTexture){
            this.addMap(normalMap, {
                samplerVariableName: VariableNameTable.getVariableName("normalMap")
            });

            this._normalMap = normalMap;
        }

        private _shadowMap:CommonTexture|CompressedTexture = null;
        get shadowMap(){
            return this._shadowMap;
        }
        set shadowMap(shadowMap:CommonTexture|CompressedTexture){
            this.addMap(shadowMap, {
                samplerVariableName: VariableNameTable.getVariableName("shadowMap")
            });

            this._shadowMap = shadowMap;
        }

        //todo support multi shadows
        private _shadowMapData:ShadowMapData = null;
        get shadowMapData(){
            return this._shadowMapData;
        }
        set shadowMapData(shadowMapData:ShadowMapData){
            this.addMap(shadowMapData.shadowMap, {
                samplerVariableName: VariableNameTable.getVariableName("shadowMap")
            });

            this._shadowMapData = shadowMapData;
        }

        public shadowMapLight:DirectionLight = null;


        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;

        public init(){
            this._setPhongMapShaderLib();
            this.shader.addLib(LightShaderLib.getInstance());

            super.init();
        }

        private _setPhongMapShaderLib(){
            if(this._diffuseMap){
                this.shader.addLib(DiffuseMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            if(this._specularMap){
                this.shader.addLib(SpecularMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.getInstance());
            }

            if(this._normalMap){
                this.shader.addLib(NormalMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoNormalMapShaderLib.getInstance());
            }

            if(this._shadowMap){
                this.shader.addLib(ShadowMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoShadowMapShaderLib.getInstance());
            }
        }
    }

    export type ShadowMapData = {
        shadowMap:ShadowMapTexture,
        shadowBias:number,
        shadowDarkness:number,
        mvpMatrixFromLight:Matrix4
    }
}

