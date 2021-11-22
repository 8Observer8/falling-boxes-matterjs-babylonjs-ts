import * as BABYLON from "babylonjs";
import * as Matter from "matter-js";
import Box from "./Box";
import Sphere from "./Sphere";

export default class Scene3D
{
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _matterEngine: Matter.Engine;
    private _box1: Box;
    private _box2: Box;
    private RATIO = 100;

    public constructor(canvasName: string)
    {
        this._matterEngine = Matter.Engine.create();
        this._matterEngine.world.gravity.y = -1;

        const canvas = document.getElementById(canvasName) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = this.createScene(canvas);

        window.onresize = () => this._engine.resize();
        this.createPhysicsSimulation();
        this.doRender();
    }

    private createScene(canvas: HTMLCanvasElement): BABYLON.Scene
    {
        const scene = new BABYLON.Scene(this._engine);

        const camera = new BABYLON.ArcRotateCamera("arcCamera",
            BABYLON.Tools.ToRadians(-90), BABYLON.Tools.ToRadians(90),
            15, new BABYLON.Vector3(0, 3, 0), scene);
        camera.attachControl(canvas, true);
        camera.wheelPrecision = 100;

        const light = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0.1, 1, -0.3), scene);

        this._box1 = new Box(2, 4, 1, 1, 1, false, this.RATIO, this._matterEngine, scene);
        this._box2 = new Box(-1.5, 4, 1, 1, 1, false, this.RATIO, this._matterEngine, scene);

        const staticSphere = new Sphere(2, 0.5, 1, true, this.RATIO, this._matterEngine, scene);
        const staticBox = new Box(-2, 0.5, 1, 1, 1, true, this.RATIO, this._matterEngine, scene);
        const ground = new Box(0, -0.5, 10, 1, 2, true, this.RATIO, this._matterEngine, scene);

        const skybox = BABYLON.MeshBuilder.CreateBox("skybox", { size: 1000 }, scene);
        skybox.infiniteDistance = true;
        const skyboxMaterial = new BABYLON.StandardMaterial("skyboxMat", scene);
        skyboxMaterial.backFaceCulling = false;
        const files = [
            "images/skybox_px.jpg",
            "images/skybox_py.jpg",
            "images/skybox_pz.jpg",
            "images/skybox_nx.jpg",
            "images/skybox_ny.jpg",
            "images/skybox_nz.jpg",
        ];
        skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        return scene;
    }

    private doRender(): void
    {
        this._engine.runRenderLoop(() => this._scene.render());
    }

    private createPhysicsSimulation(): void
    {
        setInterval(
            () =>
            {
                this.updatePhysics();
            }, 15);
    }

    private updatePhysics(): void
    {
        Matter.Engine.update(this._matterEngine);
        this._box1.update();
        this._box2.update();
    }
}
