import * as BABYLON from "babylonjs";
import * as Matter from "matter-js";

export default class Box
{
    protected _box: BABYLON.Mesh;
    private _body: Matter.Body;
    private _ratio: number;

    public constructor(x: number, y: number, width: number, height: number,
        depth: number, isStatic: boolean, ratio: number, matterEngine: Matter.Engine, scene: BABYLON.Scene)
    {
        this._box = BABYLON.MeshBuilder.CreateBox("box",
            { width: width, height: height, depth: depth }, scene);
        this._box.position.x = x;
        this._box.position.y = y;

        this._ratio = ratio;

        this._body = Matter.Bodies.rectangle(x * this._ratio, y * this._ratio,
            width * this._ratio, height * this._ratio, { isStatic: isStatic });
        Matter.World.add(matterEngine.world, this._body);
    }

    public update(): void
    {
        this._box.position.x = this._body.position.x / this._ratio;
        this._box.position.y = this._body.position.y / this._ratio;
        this._box.rotation.z = this._body.angle;
    }
}
