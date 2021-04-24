import * as THREE from "three"
import { TweenLite } from "gsap"

class CubeFloor {
    constructor() {
        this.bind()

        this.cubeGroup = new THREE.Group()
        this.texLoader = new THREE.TextureLoader()
        this.matCapMap = this.texLoader.load('assets/textures/shinyBall.jpg')

        this.params = {
            xNum: 40,
            zNum: 40,
            wIntensity: 0,
            wStartHeight: 0.1
        }
    }

    init(scene) {
        this.scene = scene
        this.intersects = []
        this.wOrigin = new THREE.Vector3(0, 0, 0)

        const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshMatcapMaterial({
            matcap: this.matCapMap
        }))

        for (let x = 0; x < this.params.xNum; x++) {
            for (let z = 0; z < this.params.zNum; z++) {
                const clone = cube.clone()
                clone.position.set(x - this.params.xNum / 2, 0, z - this.params.zNum / 2)
                this.cubeGroup.add(clone)
            }
        }
        this.scene.add(this.cubeGroup)
        console.log(this.scene)
        window.addEventListener('click', this.onMouseDown)
        this.intensAnim = TweenLite.to(this.params, 1, {
            wIntensity: 0
        })
        this.intensAnim.paused(true)

    }

    onMouseDown() {
        if (this.intersects.length >= 1) {
            this.wOrigin = this.intersects[0].object.position
        }
        this.params.wIntensity = 3
        this.intensAnim.pause(0)
        this.intensAnim.play()
    }

    update(intersects) {
        this.intersects = intersects

        // console.log(intersects[0])
        let i = 0
        while (i < this.cubeGroup.children.length) {
            const d = this.wOrigin.distanceTo(this.cubeGroup.children[i].position)
            this.cubeGroup.children[i].scale.y = ((Math.sin(Date.now() * 0.01 - d) + 1) * .5) * this.params.wIntensity + this.params.wStartHeight
            i++
        }
    }

    bind() {
        this.onMouseDown = this.onMouseDown.bind(this)
    }
}

const _instance = new CubeFloor()
export default _instance