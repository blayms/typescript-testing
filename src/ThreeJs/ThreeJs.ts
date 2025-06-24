import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export class ThreeJSScene
{
    private scene?: THREE.Scene;
    private camera?: THREE.PerspectiveCamera;
    private webGl?: THREE.WebGLRenderer;
    #_update;
    private textMesh?: THREE.Mesh;
    private cube?: THREE.Mesh;

    constructor()
    {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 10;

        this.webGl = new THREE.WebGLRenderer({ antialias: true });
        this.webGl.setClearColor("#000000");
        this.webGl.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.webGl.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) =>
        {
            const textGeometry = new TextGeometry('Press SPACE to return!!', {
                font: font,
                size: 1.5,
                depth: 0.3,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 5
            });

            const textMaterial = new THREE.MeshPhongMaterial({
                color: 0xffff00,
                emissive: 0xffaa00,
                shininess: 100,
                specular: 0xffffff
            });

            this.textMesh = new THREE.Mesh(textGeometry, textMaterial);

            textGeometry.computeBoundingBox();
            if (textGeometry.boundingBox)
            {
                const centerX = (textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x) / 2;
                const centerY = (textGeometry.boundingBox.max.y + textGeometry.boundingBox.min.y) / 2;
                this.textMesh.position.set(-centerX, -centerY, 0);
            }

            this.textMesh.position.z = 2;

            this.scene?.add(this.textMesh);

            window.addEventListener('contextmenu', (event) =>
            {
                event.preventDefault();
            });

            window.addEventListener('keydown', (event) =>
            {
                if (event.code === 'Space')
                {
                    window.location.href = "index.html";
                }
            });


        });

        this.#_update = () =>
        {
            if (this.cube)
            {
                this.cube.rotation.x += 0.01;
                this.cube.rotation.y += 0.01;
            }

            if (this.textMesh)
            {
                this.textMesh.rotation.x += 0.02;
                this.textMesh.rotation.y += 0.03;

                const intensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);
                (this.textMesh.material as THREE.MeshPhongMaterial).emissiveIntensity = intensity;
            }

            this.webGl?.render(this.scene!, this.camera!);
        };

        window.addEventListener("resize", this.OnWindowResize, false);
    }

    public BeginRendering = () =>
    {
        requestAnimationFrame(this.BeginRendering);
        this.#_update();
        this.webGl?.render(this.scene!, this.camera!);
    }

    private OnWindowResize = () =>
    {
        this.camera!.aspect = window.innerWidth / window.innerHeight;
        this.camera!.updateProjectionMatrix();

        this.webGl?.setSize(window.innerWidth, window.innerHeight);
    }
}
