import * as BABYLON from "babylonjs";
import * as Matter from "matter-js";

export default class Sphere
{
    protected _sphere: BABYLON.Mesh;
    private _body: Matter.Body;
    private _ratio: number;

    public constructor(x: number, y: number, diameter: number,
        isStatic: boolean, ratio: number, matterEngine: Matter.Engine, scene: BABYLON.Scene)
    {
        this._sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
            { diameter: diameter }, scene);
        this._sphere.position.x = x;
        this._sphere.position.y = y;

        this._ratio = ratio;

        this._body = Matter.Bodies.circle(x * this._ratio, y * this._ratio,
            diameter / 2 * this._ratio, { isStatic: isStatic });
        Matter.World.add(matterEngine.world, this._body);
    }

    public update(): void
    {
        this._sphere.position.x = this._body.position.x / this._ratio;
        this._sphere.position.y = this._body.position.y / this._ratio;
        this._sphere.rotation.z = this._body.angle;
    }
}
