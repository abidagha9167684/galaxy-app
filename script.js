// Scene setup
const scene = new THREE.Scene();
const canvas = document.querySelector('canvas');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

// Lighting
const sunLight = new THREE.PointLight(0xfdb813, 2, 300);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Starfield background
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const starsVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 4000;
    const y = (Math.random() - 0.5) * 4000;
    const z = (Math.random() - 0.5) * 4000;
    starsVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starsVertices), 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Planet data
const planetsData = [
    { name: 'Mercury', size: 3.8, distance: 40, speed: 0.04, color: 0x8c7853 },
    { name: 'Venus', size: 9.5, distance: 60, speed: 0.015, color: 0xffc649 },
    { name: 'Earth', size: 10, distance: 90, speed: 0.01, color: 0x4a90ff },
    { name: 'Mars', size: 5.3, distance: 120, speed: 0.008, color: 0xff6347 },
    { name: 'Jupiter', size: 25, distance: 180, speed: 0.002, color: 0xc88b3a },
    { name: 'Saturn', size: 21, distance: 240, speed: 0.0009, color: 0xfad5a5 },
    { name: 'Uranus', size: 15, distance: 300, speed: 0.0004, color: 0x4fd0e7 },
    { name: 'Neptune', size: 14, distance: 360, speed: 0.0001, color: 0x4166f5 }
];

// Sun
const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add sun glow
const glowGeometry = new THREE.SphereGeometry(15, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffa500,
    transparent: true,
    opacity: 0.1
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glow);

// Create planets
const planets = [];
const orbits = [];

planetsData.forEach(data => {
    // Planet mesh
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;
    planet.userData = {
        name: data.name,
        distance: data.distance,
        speed: data.speed,
        angle: Math.random() * Math.PI * 2,
        size: data.size
    };
    scene.add(planet);
    planets.push(planet);

    // Orbit line
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        orbitPoints.push(
            Math.cos(angle) * data.distance,
            0,
            Math.sin(angle) * data.distance
        );
    }
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(orbitPoints), 3));
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x64c8ff, transparent: true, opacity: 0.3 });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbit);
    orbits.push(orbit);
});

// Controls
let isRotating = true;
let autoRotate = 0;
let speed = 1;
let selectedPlanet = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onPlanetClick);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('wheel', onMouseWheel, false);

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaX * 0.01);
        camera.position.applyAxisAngle(camera.getWorldDirection(new THREE.Vector3()).cross(new THREE.Vector3(0, 1, 0)), deltaY * 0.01);
        camera.lookAt(0, 0, 0);
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});

function onPlanetClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);
    
    if (intersects.length > 0) {
        selectedPlanet = intersects[0].object;
        updatePlanetInfo();
    }
}

function updatePlanetInfo() {
    if (selectedPlanet) {
        const data = selectedPlanet.userData;
        const info = `
            <div class="planet-name">🪐 ${data.name}</div>
            <div class="planet-info">
                <div>Distance from Sun: ${data.distance} AU</div>
                <div>Orbital Speed: ${(data.speed * 100).toFixed(2)} units/frame</div>
                <div>Size: ${data.size} km (relative)</div>
            </div>
        `;
        document.getElementById('selectedPlanetInfo').innerHTML = info;
    }
}

function onKeyDown(event) {
    if (event.code === 'Space') {
        isRotating = !isRotating;
    }
    if (event.code === 'KeyR') {
        camera.position.set(0, 50, 50);
        camera.lookAt(0, 0, 0);
        selectedPlanet = null;
        document.getElementById('selectedPlanetInfo').innerHTML = '<div class="planet-info">Click on a planet to learn more</div>';
    }
    if (event.code === 'Equal' || event.code === 'Plus') {
        speed = Math.min(speed + 0.1, 5);
    }
    if (event.code === 'Minus') {
        speed = Math.max(speed - 0.1, 0.1);
    }
}

function onMouseWheel(event) {
    event.preventDefault();
    const direction = camera.position.clone().normalize();
    const distance = camera.position.length();
    const newDistance = Math.max(30, Math.min(500, distance + event.deltaY * 0.5));
    const ratio = newDistance / distance;
    camera.position.multiplyScalar(ratio);
}

// Animation loop
let frameCount = 0;
let lastTime = Date.now();

function animate() {
    requestAnimationFrame(animate);

    if (isRotating) {
        autoRotate += 0.0005 * speed;
        planets.forEach(planet => {
            planet.userData.angle += planet.userData.speed * speed;
            planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
            planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
            planet.rotation.y += 0.01;
        });
    }

    sun.rotation.y += 0.005;
    glow.scale.set(1.1 + Math.sin(Date.now() * 0.001) * 0.1, 1.1 + Math.sin(Date.now() * 0.001) * 0.1, 1.1 + Math.sin(Date.now() * 0.001) * 0.1);

    renderer.render(scene, camera);

    // FPS counter
    frameCount++;
    const currentTime = Date.now();
    if (currentTime >= lastTime + 1000) {
        document.getElementById('fps').textContent = frameCount;
        frameCount = 0;
        lastTime = currentTime;
    }
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hide loading screen
document.querySelector('.loading').style.display = 'none';

animate();
