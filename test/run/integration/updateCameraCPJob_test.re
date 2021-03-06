open Wonder_jest;

let _ =
  describe("test update_camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~updatePipelineData={
          name: "update",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "update_camera", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update camera buffer data", () => {
      describe(
        "set active camera's viewInverse, projectionInverse, near, far to camera buffer data",
        () => {
        testPromise("test", () => {
          let (
            (
              gameObjectRepo,
              basicCameraViewRepo,
              perspectiveCameraProjectionRepo,
            ),
            _,
          ) =
            CameraTool.buildRepoWithOneBasicCameraViewAndOnePerspectiveCameraProjection(
              sandbox,
            );
          SceneGraphRepoDependencyTool.build(
            ~sandbox,
            ~gameObjectRepo,
            ~basicCameraViewRepo,
            ~perspectiveCameraProjectionRepo,
            (),
          )
          ->SceneGraphRepoDependencyTool.set;
          WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
          CameraCPTool.buildAndSetAllBufferData(
            WebGPUDependencyTool.createDeviceObject(),
          );

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                let (_, typeArr) = CameraCPTool.getCameraBufferData();

                typeArr->expect
                == Js.Typed_array.Float32Array.make([|
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.5773502588272095,
                     (-0.),
                     (-0.),
                     (-0.),
                     0.,
                     0.5773502588272095,
                     0.,
                     (-0.),
                     (-0.),
                     (-0.),
                     (-0.),
                     (-4.999500274658203),
                     (-0.),
                     (-0.),
                     (-1.),
                     5.000500679016113,
                     0.10000000149011612,
                     1000.,
                   |]);
              },
            (),
          );
        })
      });

      testPromise("set camera buffer's data", () => {
        let (
          (
            gameObjectRepo,
            basicCameraViewRepo,
            perspectiveCameraProjectionRepo,
          ),
          _,
        ) =
          CameraTool.buildRepoWithOneBasicCameraViewAndOnePerspectiveCameraProjection(
            sandbox,
          );
        SceneGraphRepoDependencyTool.build(
          ~sandbox,
          ~gameObjectRepo,
          ~basicCameraViewRepo,
          ~perspectiveCameraProjectionRepo,
          (),
        )
        ->SceneGraphRepoDependencyTool.set;
        let setSubFloat32DataStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.createThreeArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        CameraCPTool.buildAndSetAllBufferData(
          WebGPUDependencyTool.createDeviceObject(),
        );
        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=
            () => {
              let (cameraBuffer, typeArr) =
                CameraCPTool.getCameraBufferData();
              setSubFloat32DataStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  0,
                  typeArr,
                  cameraBuffer->UniformBufferVO.value,
                ));
            },
          (),
        );
      });
    });
  });
