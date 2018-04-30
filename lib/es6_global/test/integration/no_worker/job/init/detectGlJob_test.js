// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Curry                          from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon                          from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1                        from "sinon";
import * as Wonder_jest                    from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs              from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs            from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs           from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs          from "../../../../tool/core/DirectorTool.js";
import * as GPUDetectTool$Wonderjs         from "../../../../tool/service/gpu/GPUDetectTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

describe("test detect gl job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function () {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(/* None */0, /* Some */["\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"detect_gl\"\n        }\n      ]\n    }\n  ]\n        "], /* None */0, /* Some */["\n\n[\n\n        {\n          \"name\": \"detect_gl\"\n        }\n]\n        "], /* None */0, /* () */0);
        };
        var _exec = function (fakeGl) {
          return DirectorTool$Wonderjs.init(FakeGlTool$Wonderjs.setFakeGl(fakeGl, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[_buildNoWorkerJobConfig(/* () */0)], /* None */0, /* () */0)));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("detect extension", (function () {
                return Wonder_jest.test("detect instanced_arrays", (function () {
                              var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                              var fakeGl = match[1];
                              _exec(fakeGl);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](fakeGl.getExtension));
                            }));
              }));
        describe("detect capabilty", (function () {
                var _prepare = function (sandbox) {
                  var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                  var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                  var fakeGl = match[1];
                  Sinon.returns({
                        precision: 0
                      }, fakeGl.getShaderPrecisionFormat);
                  return /* tuple */[
                          fakeGl,
                          warn,
                          0,
                          1,
                          2,
                          3
                        ];
                };
                Wonder_jest.test("if highp is available, use highp", (function () {
                        var match = _prepare(sandbox);
                        var highFloat = match[4];
                        var fakeGl = match[0];
                        Sinon.returns({
                              precision: 1
                            }, Sinon.withTwoArgs(match[2], highFloat, fakeGl.getShaderPrecisionFormat));
                        Sinon.returns({
                              precision: 1
                            }, Sinon.withTwoArgs(match[3], highFloat, fakeGl.getShaderPrecisionFormat));
                        var state = _exec(fakeGl);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GPUDetectTool$Wonderjs.getRecord(state)[/* precision */1]), /* Some */[/* HIGHP */0]);
                      }));
                Wonder_jest.test("else if mediump is available, warn and use mediump", (function () {
                        var match = _prepare(sandbox);
                        var mediumFloat = match[5];
                        var fakeGl = match[0];
                        Sinon.returns({
                              precision: 1
                            }, Sinon.withTwoArgs(match[2], mediumFloat, fakeGl.getShaderPrecisionFormat));
                        Sinon.returns({
                              precision: 1
                            }, Sinon.withTwoArgs(match[3], mediumFloat, fakeGl.getShaderPrecisionFormat));
                        var state = _exec(fakeGl);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        Sinon.getCallCount(match[1]),
                                        GPUDetectTool$Wonderjs.getRecord(state)[/* precision */1]
                                      ]), /* tuple */[
                                    1,
                                    /* Some */[/* MEDIUMP */1]
                                  ]);
                      }));
                return Wonder_jest.test("else, warn and use lowp", (function () {
                              var match = _prepare(sandbox);
                              var state = _exec(match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(match[1]),
                                              GPUDetectTool$Wonderjs.getRecord(state)[/* precision */1]
                                            ]), /* tuple */[
                                          1,
                                          /* Some */[/* LOWP */2]
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */