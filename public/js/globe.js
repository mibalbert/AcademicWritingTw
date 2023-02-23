const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('globe'),
});
renderer.setSize(600, 600);

const sphere = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true,
});
const mesh = new THREE.Mesh(sphere, material);

scene.add(mesh);
camera.position.z = 10;

function animate() {
	requestAnimationFrame(animate);
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	renderer.render(scene, camera);
}

animate();
