// Tower definition class

const TOWER_TYPES = {
    shooter: {
        name: 'Shooter',
        cost: 100,
        damage: 1,
        range: 100,
        fireRate: 1200,  
        color: '#4CAF50',
        projectileCount: 1,
        projectileSpeed: 1,
        width: 30,
        height: 30
    },
    blaster: {
        name: 'Blaster',
        cost: 250,
        damage: 2,
        range: 25,
        fireRate: 1250,
        color: '#FF9800',
        projectileCount: 6,
        projectileSpeed: 0.5,
        width: 34,
        height: 34
    },
    railgun: {
        name: 'Railgun',
        cost: 300,
        damage: 5,
        range: 1000,
        fireRate: 3500,
        color: '#2196F3',
        projectileCount: 1, 
        projectileSpeed: 0.8,
        width: 30,
        height: 30
    }
};

class Tower {
    constructor(x, y, type) {
        const def = TOWER_TYPES[type];
        if (!def) throw new Error(`Unknown tower type: ${type}`);

        // Center the tower on the placement point
        this.x = x - def.width / 2;
        this.y = y - def.height / 2;
        this.type = type;
        this.name = def.name;
        this.cost = def.cost;
        this.damage = def.damage;
        this.range = def.range;
        this.fireRate = def.fireRate;
        this.color = def.color;
        this.projectileSpeed = def.projectileSpeed;
        this.width = def.width;
        this.height = def.height;
        this.projectileCount = def.projectileCount || 1;
        this.fireCooldown = 0;
        this.target = null;
        this.showRange = false;
    }

    /**
     * Update tower state: cool down fire and acquire nearest enemy in range.
     * @param {number} deltaTime
     * @param {Array} enemies 
     */
    update(deltaTime, enemies) {
        this.fireCooldown = Math.max(0, this.fireCooldown - deltaTime);

        // Find the closest enemy within range
        this.target = null;
        let closestDist = this.range;
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;

        enemies.forEach(enemy => {
            if (!enemy || enemy.hp <= 0) return;
            const dx = (enemy.x + (enemy.width || 0) / 2) - cx;
            const dy = (enemy.y + (enemy.height || 0) / 2) - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= this.range && dist < closestDist) {
                closestDist = dist;
                this.target = enemy;
            }
        });
    }

    /**
     * Fire bullets toward/around the current target.
     * Single-shot towers aim directly; multi-shot towers (projectileCount > 1)
     * fire projectiles evenly spread in a full 360° burst.
     * @param {Array} bullets - shared game bullets array
     */
    shoot(bullets) {
        if (!this.target || this.fireCooldown > 0) return;
        this.fireCooldown = this.fireRate;

        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        const tx = this.target.x + (this.target.width || 0) / 2;
        const ty = this.target.y + (this.target.height || 0) / 2;

        const dx = tx - cx;
        const dy = ty - cy;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len === 0) return;

        const baseAngle = Math.atan2(dy, dx);
        const count = this.projectileCount;
        // Multi-shot: spread evenly over 360°; single-shot: aim at target
        const angleStep = count > 1 ? (Math.PI * 2) / count : 0;

        for (let i = 0; i < count; i++) {
            const angle = count > 1 ? i * angleStep : baseAngle;

            const bullet = new Bullet(cx, cy, true);
            bullet.width = 6;
            bullet.height = 6;
            bullet.vx = Math.cos(angle) * this.projectileSpeed;
            bullet.vy = Math.sin(angle) * this.projectileSpeed;
            bullet.damage = this.damage;
            bullet.towerColor = this.color;
            bullet.fromTower = true;

            bullet.render = function(ctx) {
                ctx.fillStyle = this.towerColor || '#ffffff';
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
            };

            bullets.push(bullet);
        }
    }

    render(ctx) {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;

        // Range ring
        if (this.showRange) {
            ctx.beginPath();
            ctx.arc(cx, cy, this.range, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Tower body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Barrel pointing toward current target
        if (this.target) {
            const tx = this.target.x + (this.target.width || 0) / 2;
            const ty = this.target.y + (this.target.height || 0) / 2;
            const angle = Math.atan2(ty - cy, tx - cx);
            const barrelLen = this.width / 2 + 6;

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * barrelLen, cy + Math.sin(angle) * barrelLen);
            ctx.stroke();
        }
    }
}
