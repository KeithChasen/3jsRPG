import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export class Terrain extends Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.createGeometry();
        this.material = new MeshStandardMaterial({ color: 0x50a000 });

        this.rotation.x = - Math.PI/2
    }

    createGeometry() {
        this.geometry?.dispose();
        this.geometry = new PlaneGeometry(this.width, this.height);
        this.position.set(this.width / 2, 0, this.height / 2);
    }
}