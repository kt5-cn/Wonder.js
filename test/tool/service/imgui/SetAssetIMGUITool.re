open Js.Typed_array;

let buildFakeBitmapData = (~data=ArrayBuffer.make(10), ()) => data;

let buildCustomImageData =
    (~id="c1", ~mimeType="image/png", ~data=ArrayBuffer.make(20), ()) => (
  data,
  id,
  mimeType,
);

let buildAndSetAssetData = state =>
  state
  |> SetAssetIMGUIMainService.setSettedAssetFntData(
       SceneGraphIMGUITool.buildFakeFntContent(),
     )
  |> SetAssetIMGUIMainService.setSettedAssetBitmapData(buildFakeBitmapData())
  |> SetAssetIMGUIMainService.addSettedAssetCustomImageData(
       buildCustomImageData(
         ~id="c1",
         ~mimeType="image/png",
         ~data=ArrayBuffer.make(20),
         (),
       ),
     )
  |> SetAssetIMGUIMainService.addSettedAssetCustomImageData(
       buildCustomImageData(
         ~id="c2",
         ~mimeType="image/jpeg",
         ~data=ArrayBuffer.make(30),
         (),
       ),
     );