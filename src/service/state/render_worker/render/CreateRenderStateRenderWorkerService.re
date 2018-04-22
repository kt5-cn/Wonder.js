open StateRenderType;

open GPUDetectType;

open RenderWorkerSettingType;

open RenderWorkerBasicMaterialType;

open RenderWorkerTransformType;

open RenderWorkerBoxGeometryType;

open RenderWorkerRenderType;

open RenderWorkerWorkerDetectType;

open DeviceManagerType;

open ShaderType;

let createRenderState =
    (
      {
        settingRecord,
        gpuDetectRecord,
        glslSenderRecord,
        programRecord,
        /* ambientLightRecord,
           directionLightRecord,
           pointLightRecord,
           sourceInstanceRecord, */
        renderRecord,
        vboBufferRecord,
        typeArrayPoolRecord,
        globalTempRecord,
        deviceManagerRecord,
        shaderRecord
      } as state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  let {localToWorldMatrices, localPositions, localToWorldMatrixCacheMap, normalMatrixCacheMap} as transformRecord =
    RecordTransformRenderWorkerService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryRenderWorkerService.getRecord(state);
  /* let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state); */
  let basicMaterialRecord = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let workerDetectRecord = RecordWorkerDetectRenderWorkerService.getRecord(state);
  /* let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state); */
  /* let {index, colors} = ambientLightRecord;
     let {index, colors, intensities} = directionLightRecord;
     let {index, colors, intensities, constants, linears, quadratics, ranges} = pointLightRecord; */
  /* let {
       objectInstanceTransformArrayMap,
       matrixInstanceBufferCapacityMap,
       matrixFloat32ArrayMap,
       isTransformStaticMap,
       isSendTransformMatrixDataMap
     } = sourceInstanceRecord; */
  {
    settingRecord: {gpu: settingRecord.gpu},
    glslSenderRecord,
    programRecord,
    boxGeometryRecord: {
      vertices: boxGeometryRecord.vertices,
      normals: boxGeometryRecord.normals,
      indices: boxGeometryRecord.indices
    },
    /* TODO finish Obj.magic */
    customGeometryRecord: Obj.magic(1),
    cameraRecord: OperateRenderRenderWorkerService.getCameraRecord(state),
    basicMaterialRecord: {
      shaderIndices: basicMaterialRecord.shaderIndices,
      colors: basicMaterialRecord.colors
    },
    lightMaterialRecord: Obj.magic(1),
    ambientLightRecord: Obj.magic(1),
    directionLightRecord: Obj.magic(1),
    pointLightRecord: Obj.magic(1),
    vboBufferRecord,
    typeArrayPoolRecord,
    transformRecord: {
      localToWorldMatrices,
      localPositions,
      localToWorldMatrixCacheMap,
      normalMatrixCacheMap
    },
    sourceInstanceRecord: Obj.magic(1),
    gpuDetectRecord,
    globalTempRecord,
    deviceManagerRecord,
    shaderRecord: {index: shaderRecord.index},
    workerDetectRecord: {isUseWorker: workerDetectRecord.isUseWorker}
  }
};