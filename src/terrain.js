import { ConeGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export class Terrain extends Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.treeCount = 10;

        this.createTerrain();

        this.createTrees();
    }

    createTerrain() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
        }
        const terrainMaterial = new MeshStandardMaterial({ color: 0x50a000 });
        const terrainGeometry = new PlaneGeometry(this.width, this.height);
        this.terrain = new Mesh(terrainGeometry, terrainMaterial);

        this.terrain.rotation.x = - Math.PI/2;
        this.terrain.position.set(this.width / 2, 0, this.height / 2);
        this.add(this.terrain);
    }

    createTrees() {
        const treeRadius = .2;
        const treeHeight = 1;

        const treeGeometry = new ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new MeshStandardMaterial({ 
            color: 0x305010,
            flatShading: true
        });

        this.trees = new Group();
        this.add(this.trees);

        for (let i = 0; i < this.treeCount; i++) {
            const treeMesh = new Mesh(treeGeometry, treeMaterial);
            treeMesh.position.set(
                this.width * Math.random(),
                treeHeight / 2,
                this.height * Math.random(),
            );
            this.trees.add(treeMesh);
        }
    }
}