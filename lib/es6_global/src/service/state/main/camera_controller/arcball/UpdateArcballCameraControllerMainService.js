

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DirtyArrayService$Wonderjs from "../../../../primitive/DirtyArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as LookAtTransfromMainService$Wonderjs from "../../transform/LookAtTransfromMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../record/main/transform/ModelMatrixTransformService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as GameObjectArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/GameObjectArcballCameraControllerService.js";

function _updateTransform(cameraController, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var transform = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectArcballCameraControllerService$Wonderjs.unsafeGetGameObject(cameraController, arcballCameraControllerRecord), gameObjectRecord);
  var distance = OperateArcballCameraControllerService$Wonderjs.unsafeGetDistance(cameraController, arcballCameraControllerRecord);
  var phi = OperateArcballCameraControllerService$Wonderjs.unsafeGetPhi(cameraController, arcballCameraControllerRecord);
  var theta = OperateArcballCameraControllerService$Wonderjs.unsafeGetTheta(cameraController, arcballCameraControllerRecord);
  var target = OperateArcballCameraControllerService$Wonderjs.unsafeGetTarget(cameraController, arcballCameraControllerRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(transform, /* tuple */[
        distance * Math.cos(phi) * Math.sin(theta) + target[0],
        distance * Math.cos(theta) + target[1],
        distance * Math.sin(phi) * Math.sin(theta) + target[2]
      ], transformRecord);
  return LookAtTransfromMainService$Wonderjs.lookAt(transform, target, newrecord, undefined, /* () */0);
}

function _clearDirtyArray(state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = /* record */[
    /* index */arcballCameraControllerRecord[/* index */0],
    /* pointDragEventHandleFuncMap */arcballCameraControllerRecord[/* pointDragEventHandleFuncMap */1],
    /* pointScaleEventHandleFuncMap */arcballCameraControllerRecord[/* pointScaleEventHandleFuncMap */2],
    /* keydownEventHandleFuncMap */arcballCameraControllerRecord[/* keydownEventHandleFuncMap */3],
    /* dirtyArray */DirtyArrayService$Wonderjs.create(/* () */0),
    /* distanceMap */arcballCameraControllerRecord[/* distanceMap */5],
    /* minDistanceMap */arcballCameraControllerRecord[/* minDistanceMap */6],
    /* phiMap */arcballCameraControllerRecord[/* phiMap */7],
    /* thetaMap */arcballCameraControllerRecord[/* thetaMap */8],
    /* thetaMarginMap */arcballCameraControllerRecord[/* thetaMarginMap */9],
    /* targetMap */arcballCameraControllerRecord[/* targetMap */10],
    /* moveSpeedXMap */arcballCameraControllerRecord[/* moveSpeedXMap */11],
    /* moveSpeedYMap */arcballCameraControllerRecord[/* moveSpeedYMap */12],
    /* rotateSpeedMap */arcballCameraControllerRecord[/* rotateSpeedMap */13],
    /* wheelSpeedMap */arcballCameraControllerRecord[/* wheelSpeedMap */14],
    /* gameObjectMap */arcballCameraControllerRecord[/* gameObjectMap */15],
    /* disposedIndexArray */arcballCameraControllerRecord[/* disposedIndexArray */16]
  ];
  return newrecord;
}

function update(state) {
  return _clearDirtyArray(ArrayService$WonderCommonlib.reduceOneParam((function (state, dirtyIndex) {
                    return _updateTransform(dirtyIndex, state);
                  }), state, ArrayService$WonderCommonlib.removeDuplicateItems(state[/* arcballCameraControllerRecord */25][/* dirtyArray */4])));
}

export {
  _updateTransform ,
  _clearDirtyArray ,
  update ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */