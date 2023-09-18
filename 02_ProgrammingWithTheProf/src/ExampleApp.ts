/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'


export class ExampleApp extends gfx.GfxApp {

    private mouth: gfx.Mesh2;
    private elapsedTime: number;
    private pacman: gfx.Mesh2;
    // --- Create the ExampleApp class ---
    constructor() {
        // initialize the base class gfx.GfxApp
        super();

        this.mouth = new gfx.Mesh2;
        this.pacman = new gfx.Mesh2;
        this.elapsedTime = 0;
    }


    // --- Initialize the graphics scene ---
    createScene(): void {
        // this.renderer.background = gfx.Color.WHITE;

        //fit all screen;
        this, this.renderer.viewport = gfx.Viewport.STRETCH;

        this.renderer.background = new gfx.Color(0.226, 0.450, 0.61);
        //float num;a: apparent


        const bgRect = gfx.Geometry2Factory.createBox(2, 2);//(2,2) could fit all screen

        //  bgRect.material.color = gfx.Color.BLACK;
        bgRect.material.texture = new gfx.Texture('assets/pac-background.png');//add texture
        this.scene.add(bgRect);

        //step1:draw a rectangle/Geometry2Factory.createBox
        //step2: set up a Member Variable: mouth;

        this.mouth = gfx.Geometry2Factory.createBox(0.8, 0.2)
        this.scene.add(this.mouth);
        this.mouth.position = new gfx.Vector2(0, -0.5);
        const rect1 = gfx.Geometry2Factory.createBox(0.2, 0.2);
        const rect2 = gfx.Geometry2Factory.createBox(0.2, 0.2)
        this.scene.add(rect1);
        rect1.position = new gfx.Vector2(-0.5, 0.5);
        this.scene.add(rect2);
        rect2.position = new gfx.Vector2(0.5, 0.5);

        //pacman:
        //this.pacman = gfx.Geometry2Factory.createCircle(0.25, 50); //2nd arg 越大越圆
        this.pacman = gfx.Geometry2Factory.createPieSlice(0.2, Math.PI / 10, -Math.PI / 10); //2nd arg 越大越圆

        this.scene.add(this.pacman);
        this.pacman.material.color = gfx.Color.YELLOW;
        // this.pacman.position = new gfx.Vector2(-1, 0);
    }


    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void {
        if (this.renderer.background.r < 1.0) {
            this.renderer.background.r += 0.01; //颜色渐变
            this.renderer.background.g += 0.01;
            console.log(this.renderer.background.r);
        }

        //give me a variable than animates smoothly over time 
        const a = Math.sin(this.elapsedTime);
        //give me the same thing but where the number never goes negatie
        const b = Math.abs(a);

        //9.11 lec2
        this.elapsedTime += deltaTime;
        // this.mouth.scale = new gfx.Vector2(1, Math.abs(Math.sin(6 * this.elapsedTime)));

        // this.mouth.position.x += 0.01;
        // if (this.mouth.position.x > 1.5) {
        //     this.mouth.position.x = -1.5;
        // }



        const speed = 6.0;
        const cycleNeg1Pos1 = Math.sin(speed * this.elapsedTime);
        const cycleZeroTwo = cycleNeg1Pos1 + 1;
        const cycleZeroOne = cycleZeroTwo / 2;
        const cycleZeroPiOver5 = cycleZeroOne * Math.PI / 5;

        //const angle = (Math.sin(speed * this.elapsedTime) + 1) * Math.PI * 5 / 2;

        //更新原有的pacman而不是新建一个;
        const tmpMesh = gfx.Geometry2Factory.createPieSlice(0.2, cycleZeroPiOver5, -cycleZeroPiOver5);
        this.pacman.setVertices(tmpMesh.getVertices());

        //rotation / change pacman color;
        // this.pacman.rotation = this.elapsedTime;
        // this.pacman.material.color = new gfx.Color(cycleZeroOne, 1 - cycleZeroOne, cycleZeroOne);


        //9.13 lec3
        this.pacman.position.x += 0.001
        if (this.pacman.position.x > 1) {
            this.pacman.position.x = -1.5;
        }

    }

    //onKeyDown(event: KeyboardEvent): void {

    // private printHello(): void {
    //     console.log('Hello');
    // }
    // onMouseDown(event: MouseEvent): void {
    //     console.log('mouse down ' + event.x + ' ' + event.y);
    // }

}
