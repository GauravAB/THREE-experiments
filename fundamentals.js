import * as THREE from '../build/three.module.js';

function main()
{
    const canvas = document.querySelector('#c')
    //get the renderer
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5

    //set the camera
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.z = 2;

    //fix the scene with some mesh 
    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    //mesh == geometry + material
    const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth);
    const material = new THREE.MeshBasicMaterial({color:0x44aa88});
    const cube = new THREE.Mesh(geometry,material);

    scene.add(cube);  
    
    renderer.render(scene,camera);

}

main();