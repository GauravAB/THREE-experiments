import * as THREE from '../build/three.module.js';



function main()
{
    const canvas = document.querySelector('#c')
    //get the renderer
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000

    //set the camera
    const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,50,0);
    camera.up.set(0,0,1);
    camera.lookAt(0,0,0);

    //fix the scene with some mesh 
    const scene = new THREE.Scene();
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);

    }

    
    const objects = [];

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    //use just one sphere for everything
    const radius = 1;
    const widthSegments = 6;
    const heightSegments =6 ;
    const sphereGeometry = new THREE.SphereGeometry(
        radius, widthSegments, heightSegments
    );
    const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5,5,5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    //add earth
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);
    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive:0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({color:0x888888, emissive: 0x222222});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5,0.5,0.5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);


    function resizeRendererToDisplaySize(renderer)
    {
        const canvas = renderer.domElement;
        
        const width = canvas.clientWidth  ;
        const height = canvas.clientHeight ;
        
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize)
        {
            renderer.setSize(width ,height, false);
        }

        return needResize;
    }

    function render(time)
    {
        time *= 0.001;
        
        if(resizeRendererToDisplaySize(renderer))
        {    
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((obj) => {
            obj.rotation.y = time;
        });

        renderer.render(scene,camera);
        
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();