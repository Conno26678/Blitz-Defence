// Maps and Path Management System
class MapManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Initialize test paths
        this.testPaths = this.createTestPaths();

        // Create maps array
        this.maps = [
            this.testPaths,
            this.testPaths.straight,
            this.testPaths.zigzag,
            this.testPaths.corner
        ];

        // Current map tracking
        this.currentMapIndex = 0;
        this.currentMap = this.testPaths;

        // Base position (center of canvas)
        this.basePosition = {
            x: this.canvasWidth / 2 - 30,
            y: this.canvasHeight / 2 - 30
        };
    }

    createTestPaths() {
        return {
            straight: [
                { x: 0, y: 400 },
                { x: 650, y: 400 }
            ],
            zigzag: [
                { x: 0, y: 200 },      // Start at left edge, upper area
                { x: 200, y: 300 },    // Zig down-right
                { x: 400, y: 150 },    // Zag up-right  
                { x: 600, y: 350 },    // Zig down-right
                { x: 800, y: 200 },    // Zag up-right
                { x: 1000, y: 400 },   // Zig down-right
                { x: 650, y: 400 }     // Final destination at center
            ],
            corner: [
                { x: 1300, y: 400 },   // Start from right edge
                { x: 1000, y: 400 },   // Straight left
                { x: 1000, y: 200 },   // Sharp turn up
                { x: 800, y: 200 },    // Straight left
                { x: 800, y: 600 },    // Sharp turn down
                { x: 650, y: 600 },    // Straight left
                { x: 650, y: 400 }     // Sharp turn to center
            ],
            spril: [
                
            ]
        };
    }

    // Cycle to next map
    cycleMap() {
        this.currentMapIndex = (this.currentMapIndex + 1) % this.maps.length;
        this.currentMap = this.maps[this.currentMapIndex];
        console.log('Switched to map index:', this.currentMapIndex);
        return this.currentMapIndex;
    }

    // Get current map name for display
    getCurrentMapName() {
        const mapNames = ['All Paths', 'Straight', 'Zigzag', 'Corner'];
        return mapNames[this.currentMapIndex];
    }

    // Get available paths for the current map
    getAvailablePaths() {
        if (this.currentMapIndex === 0) {
            // All paths available
            return ['straight', 'zigzag', 'corner'];
        } else if (this.currentMapIndex === 1) {
            return ['straight'];
        } else if (this.currentMapIndex === 2) {
            return ['zigzag', 'straight'];
        } else if (this.currentMapIndex === 3) {
            return ['corner', 'straight'];
        }
    }

    // Get a specific path by name
    getPath(pathName) {
        return this.testPaths[pathName];
    }

    // Get spawn position for a path (first waypoint)
    getSpawnPosition(pathName) {
        const path = this.getPath(pathName);
        return { x: path[0].x, y: path[0].y };
    }

    // Get the full path waypoints
    getPathWaypoints(pathName) {
        return this.getPath(pathName);
    }

    getTrackMode() {
        // Define track modes for each map
        const trackModes = {
            0: 'perEnemy',  // All Paths - rotate per enemy
            1: 'single',    // Straight - single path only
            2: 'perWave',   // Zigzag - rotate per wave  
            3: 'perEnemy'   // Corner - rotate per enemy
        };

        return trackModes[this.currentMapIndex] || 'single';
    }


    // Render all paths based on current map selection
    renderPaths(ctx) {
        ctx.lineWidth = 10;

        if (this.currentMapIndex === 0) {
            // Show all paths
            this.renderAllPaths(ctx);
        } else if (this.currentMapIndex === 1) {
            // Show only straight path
            this.renderStraightPath(ctx);
        } else if (this.currentMapIndex === 2) {
            // Show only zigzag path
            this.renderZigzagPath(ctx);
        } else if (this.currentMapIndex === 3) {
            // Show only corner path
            this.renderCornerPath(ctx);
        }
    }

    renderAllPaths(ctx) {
        // Render straight path
        if (this.testPaths.straight) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.straight[0].x, this.testPaths.straight[0].y);
            ctx.lineTo(this.testPaths.straight[1].x, this.testPaths.straight[1].y);
            ctx.stroke();
        }

        // Render zigzag path
        if (this.testPaths.zigzag) {
            ctx.strokeStyle = 'rgba(0, 26, 255, 1)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.zigzag[0].x, this.testPaths.zigzag[0].y);
            for (let i = 1; i < this.testPaths.zigzag.length; i++) {
                ctx.lineTo(this.testPaths.zigzag[i].x, this.testPaths.zigzag[i].y);
            }
            ctx.stroke();
        }

        // Render corner path
        if (this.testPaths.corner) {
            ctx.strokeStyle = 'rgba(0, 255, 0, 1)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.corner[0].x, this.testPaths.corner[0].y);
            for (let i = 1; i < this.testPaths.corner.length; i++) {
                ctx.lineTo(this.testPaths.corner[i].x, this.testPaths.corner[i].y);
            }
            ctx.stroke();
        }
    }

    renderStraightPath(ctx) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.moveTo(this.testPaths.straight[0].x, this.testPaths.straight[0].y);
        ctx.lineTo(this.testPaths.straight[1].x, this.testPaths.straight[1].y);
        ctx.stroke();
    }

    renderZigzagPath(ctx) {
        if (this.testPaths.zigzag) {
            ctx.strokeStyle = 'rgba(0, 26, 255, 1)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.zigzag[0].x, this.testPaths.zigzag[0].y);
            for (let i = 1; i < this.testPaths.zigzag.length; i++) {
                ctx.lineTo(this.testPaths.zigzag[i].x, this.testPaths.zigzag[i].y);
            }
            ctx.stroke();
        }


        if (this.testPaths.straight) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.straight[0].x, this.testPaths.straight[0].y);
            ctx.lineTo(this.testPaths.straight[1].x, this.testPaths.straight[1].y);
            ctx.stroke();
        }
    }

    renderCornerPath(ctx) {
        if (this.testPaths.corner) {
            ctx.strokeStyle = 'rgba(0, 255, 0, 1)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.corner[0].x, this.testPaths.corner[0].y);
            for (let i = 1; i < this.testPaths.corner.length; i++) {
                ctx.lineTo(this.testPaths.corner[i].x, this.testPaths.corner[i].y);
            }
            ctx.stroke();
        }

        if (this.testPaths.straight) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.moveTo(this.testPaths.straight[0].x, this.testPaths.straight[0].y);
            ctx.lineTo(this.testPaths.straight[1].x, this.testPaths.straight[1].y);
            ctx.stroke();
        }
    }

    // Render the base (destination)
    renderBase(ctx) {
        // Draw the grey square base at the center
        ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
        ctx.fillRect(this.basePosition.x, this.basePosition.y, 60, 60);

        // Add a border
        ctx.strokeStyle = 'rgba(64, 64, 64, 1.0)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.basePosition.x, this.basePosition.y, 60, 60);
    }

    // Optional: Display current map name on screen
    renderMapName(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
    }

    /**
     * Check whether a canvas point (px, py) lies on or very near any active
     * path segment for the current map.
     *
     * @param {number} px - x coordinate to test
     * @param {number} py - y coordinate to test
     * @param {number} [tolerance=20] - min distance (px) from segment center line
     *   that counts as "on track".  Should be >= half the rendered track lineWidth
     *   plus half the tower width so towers cannot straddle the path.
     * @returns {boolean}
     */
    isPointOnTrack(px, py, tolerance = 20) {
        const paths = this.getAvailablePaths();
        for (const pathName of paths) {
            const waypoints = this.getPath(pathName);
            if (!waypoints || waypoints.length < 2) continue;

            for (let i = 0; i < waypoints.length - 1; i++) {
                const ax = waypoints[i].x;
                const ay = waypoints[i].y;
                const bx = waypoints[i + 1].x;
                const by = waypoints[i + 1].y;

                // Project point onto segment and find closest point on it
                const dx = bx - ax;
                const dy = by - ay;
                const lenSq = dx * dx + dy * dy;
                let t = 0;
                if (lenSq > 0) {
                    t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
                    t = Math.max(0, Math.min(1, t));
                }
                const closestX = ax + t * dx;
                const closestY = ay + t * dy;

                const dist = Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
                if (dist <= tolerance) return true;
            }
        }
        return false;
    }
}
