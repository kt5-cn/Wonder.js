open SourceInstanceType;

open Contract;

let create = (state: StateDataType.state) => SourceInstanceCreateCommon.create(state);

let getSourceInstanceData = SourceInstanceStateCommon.getSourceInstanceData;

let isSendModelMatrix = SourceInstanceStaticCommon.isSendModelMatrix;

let markSendModelMatrix = SourceInstanceStaticCommon.markSendModelMatrix;

let getObjectInstanceList = (sourceInstance, state: StateDataType.state) =>
  SourceInstanceObjectInstanceListCommon.getObjectInstanceList(sourceInstance, state);

let _addObjectInstnace = (sourceInstance, uid, {objectInstanceListMap} as data) => {
  objectInstanceListMap
  |> SourceInstanceObjectInstanceListCommon.unsafeGetObjectInstanceList(sourceInstance)
  |> Js.Array.push(uid)
  |> ignore;
  data
};

let createInstance = (sourceInstance, state: StateDataType.state) => {
  open GameObjectComponentCommon;
  let (state, uid) = GameObjectCreateCommon.create(state);
  _addObjectInstnace(sourceInstance, uid, SourceInstanceStateCommon.getSourceInstanceData(state))
  |> ignore;
  let (state, transform) = TransformSystem.create(state);
  let (state, objectInstance) = ObjectInstanceSystem.create(sourceInstance, uid, state);
  let state =
    state
    |> addTransformComponent(uid, transform)
    |> addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};

let getGameObject = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).gameObjectMap
  );

let markModelMatrixIsStatic = SourceInstanceStaticCommon.markModelMatrixIsStatic;

let isModelMatrixIsStatic = SourceInstanceStaticCommon.isModelMatrixIsStatic;