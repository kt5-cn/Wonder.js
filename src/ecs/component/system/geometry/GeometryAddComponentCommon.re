open GeometryType;

open GeometryStateCommon;

let handleAddComponent =
  [@bs]
  (
    (geometry: geometry, gameObjectUid: int, state: StateDataType.state) => {
      let geometryData = getGeometryData(state);
      ComponentSystem.addComponentToGameObjectMap(
        geometry,
        gameObjectUid,
        geometryData.gameObjectMap
      )
      |> ignore;
      state
    }
  );