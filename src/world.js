import { 
    ConeGeometry, 
    Group, 
    Mesh,
    MeshStandardMaterial, 
    PlaneGeometry, 
    SphereGeometry, 
    Vector2
} from 'three';

export class World extends Mesh {
    #objectMap = new Map();

    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.treeCount = 10;
        this.rockCount = 20;
        this.bushCount = 10;

        this.trees = new Group();
        this.add(this.trees);

        this.rocks = new Group();
        this.add(this.rocks);

        this.bushes = new Group();
        this.add(this.bushes);

       this.generate();
    }

    generate() {
        this.clear();
        this.createTerrain();
        this.createTrees();
        this.createRocks();
        this.createBushes();
    }

    clear() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }

        if (this.trees) {
            this.trees.children.forEach(tree => {
                tree.geometry?.dispose();
                tree.material?.dispose();
            });
            this.trees.clear();
        }

        if (this.rocks) {
            this.rocks.children.forEach(rock => {
                rock.geometry?.dispose();
                rock.material?.dispose();
            });
            this.rocks.clear();
        }

        if (this.bushes) {
            this.bushes.children.forEach(bush => {
                bush.geometry?.dispose();
                bush.material?.dispose();
            });
            this.bushes.clear();
        }

        this.#objectMap.clear();
    }

    createTerrain() {
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

        for (let i = 0; i < this.treeCount; i++) {
            const treeMesh = new Mesh(treeGeometry, treeMaterial);
            const coords = new Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random()),
            )
            if(this.#objectMap.has(`${coords.x}-${coords.y}`)) {
                continue;
            }
            treeMesh.position.set(
                coords.x + .5,
                treeHeight / 2,
                coords.y + .5,
            );
            this.trees.add(treeMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`, treeMesh);
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

        for (let i = 0; i < this.rockCount; i++) {
            const radius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
            const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
            const rockGeometry = new SphereGeometry(radius, 6, 5);
            const rockMesh = new Mesh(rockGeometry, rockMaterial);

            const coords = new Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random()),
            )
            if(this.#objectMap.has(`${coords.x}-${coords.y}`)) {
                continue;
            }
            rockMesh.position.set(
                coords.x + .5,
                0,
                coords.y + .5,
            );
            rockMesh.scale.y = height
            this.rocks.add(rockMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`, rockMesh);
        }
    }

    createBushes() {
        const minBushRadius = .1;
        const maxBushRadius = .3;

        const bushMaterial = new MeshStandardMaterial({ 
            color: 0x80a040,
            flatShading: true
        });

        for (let i = 0; i < this.bushCount; i++) {
            const radius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
            const bushGeometry = new SphereGeometry(radius, 8, 8);
            const bushMesh = new Mesh(bushGeometry, bushMaterial);
            const coords = new Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random()),
            )
            if(this.#objectMap.has(`${coords.x}-${coords.y}`)) {
                continue;
            }
            bushMesh.position.set(
                coords.x + .5,
                radius,
                coords.y + .5,
            );
            this.bushes.add(bushMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`, bushMesh);
        }
    }
}