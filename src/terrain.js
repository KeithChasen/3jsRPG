import { 
    ConeGeometry, 
    Group, 
    Mesh,
    MeshStandardMaterial, 
    PlaneGeometry, 
    SphereGeometry 
} from 'three';

export class Terrain extends Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.treeCount = 10;
        this.rockCount = 20;

        this.createTerrain();

        this.createTrees();

        this.createRocks();
    }

    createTerrain() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        const terrainMaterial = new MeshStandardMaterial({ 
            color: 0x50a000,
            // wireframe: true 
        });
        const terrainGeometry = new PlaneGeometry(
            this.width, 
            this.height,
            this.width, 
            this.height,
        );
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
                Math.floor(this.width * Math.random()) + .5,
                treeHeight / 2,
                Math.floor(this.height * Math.random()) + .5,
            );
            this.trees.add(treeMesh);
        }
    }

    createRocks() {
        const minRockRadius = .1;
        const maxRockRadius = .3;
        const minRockHeight = .5;
        const maxRockHeight = .8;

        const rockMaterial = new MeshStandardMaterial({ 
            color: 0xb0b0b0,
            flatShading: true
        });

        this.rocks = new Group();
        this.add(this.rocks);

        for (let i = 0; i < this.rockCount; i++) {
            const radius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
            const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
            const rockGeometry = new SphereGeometry(radius, 6, 5);
            const rockMesh = new Mesh(rockGeometry, rockMaterial);
            rockMesh.position.set(
                Math.floor(this.width * Math.random()) + .5,
                0,
                Math.floor(this.height * Math.random()) + .5,
            );
            rockMesh.scale.y = height
            this.rocks.add(rockMesh);
        }
    }
}