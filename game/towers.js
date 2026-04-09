// Tower classes

const { name } = require("ejs");

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
    },
    hacker: {
        name: 'Hacker',
        cost: 850,
        damage: 0,
        color: '#9C27B0',
        width: 30,
        height: 30
    },
    gambler: {
        name: 'Gambler',
        cost: 600,
        damage: 1,
        range: 100,
        fireRate: 1500,
        color: '#E91E63', //Reset with gamling or slots image later
        projectileCount: 1,
        projectileSpeed: 1,
        width: 30,
        height: 30
    },
    overlord: {
        name: 'Overlord',
        cost: 650,
        damage: 1,
        range: 25,
        fireRate: 1250,
        width: 30,
        height: 30,
        seeHiden: true,
        summonSpeed: 2500,
        color: '#795548',
        // Summon Stats
        // Summon Type: Enemy
        // Spawn Count: 3
        // Spawn Damage: Enemy damage
        // Spawn Life: Enemies health
        // Spawn Speed: Enemies speed
        // seeHidden = true
        // damageReinforced = true
    },
    boomer: {
        name: 'Boomer',
        cost: 500,
        damage: 3,
        range: 65,
        fireRate: 1500,
        pierce: 0,
        projectileSpeed: 0.85,
        projectileCount: 1,
        seeHidden: false,
        damageReinforced: true,
        explosionArea: 25,
        color: '#f44336', //add vault boy later
        width: 30,
        height: 30
    },
    generator: {
        name: 'Shield Generator',
        cost: 50, //digipogs, change value later
        damage: 0,
        color: '#00BCD4', //add shield image later
        width: 30,
        height: 30,
        regenSpeed : 5000,
        regenAmount : 15,
        regenMax: 30
    },
    sentinel: {
        name: 'Sentinel',
        range: 25,
        damage: 1,
        fireRate: 500,
        pierce: 0,
        projectileSpeed: 1,
        projectileLife: 1,
        projectileCount: 1,
        seeHidden: false,
        damageReinforced: false,
        width: 40,
        height: 30,
    }
};

const TOWER_UPGRADES = {
    shooter: [
        {
            id: 'scout',
            tier: 1,
            name: 'Scout',
            description: 'Attack Faster over a longer range',
            cost: 325,
            apply: (tower) => {
                tower.fireRate = Math.max(120, Math.round(tower.fireRate * 0.9));
                tower.range += 5;
            }
        }
    ],
    shooter: [
        {
            id: 'betterBullets',
            tier: 2,
            name: 'Better Bullets',
            description: 'Higher caliber bullets with increased damage and puncture',
            cost: 650,
            apply: (tower) => {}
        }
    ],
    shooter: [
        {
            id: 'goodGoggles',
            tier: 3,
            name: 'Good Goggles',
            description: 'Improved vision allows you to see farther and through stealth',
            cost: 1200,
            apply: (tower) => {}
        }
    ],
    shooter: [
        {
            id: 'twinFire',
            tier: 4,
            name: 'Twin Fire',
            description: 'Double the gun, double the bullets, and double the fun.',
            cost: 2450,
            apply: (tower) => {}
        }
    ],
     shooter: [
        {
            id: 'rapidFire',
            tier: 5,
            name: 'Rapid Fire',
            description: 'Took a few gun saftey courses, more damage, more peirce, and much faster fire rate.',
            cost: 5500,
            apply: (tower) => {}
        }
    ],
    shooter: [
        {
            id: 'tf2scout',
            tier: 6,
            name: 'TF2 Scout',
            description: 'THINK FAST CHUCKLENUTS! An aggressive and snarky fighter with even higher damage and fire rate. Chance to stun enemies on hit.',
            cost: 10000,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'betterCooling',
            tier: 1,
            name: 'Better Cooling',
            description: 'Improved cooling system allowing for slightlyfaster firing.',
            cost: 325,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'highCaliber',
            tier: 2,
            name: 'High Caliber',
            description: 'Higher caliber bullets with the ability to rip through armor and deal increased damage and puncture',
            cost: 650,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'overclocked',
            tier: 3,
            name: 'Overclocked',
            description: 'Improved firing mechanism allowing for more damage but slowing down the fire rate.',
            cost: 1200,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'refraction',
            tier: 4,
            name: 'Refraction',
            description: 'Advanced refractive lens technology that refracts into a multitude of smaller blasts.',
            cost: 2450,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'ultimatelazer',
            tier: 5,
            name: 'Ultimate Lazer',
            description: 'The ultimate laser weapon with an unstopable beam giving increased damage, puncture, but slowing fire rate.',
            cost: 5500,
            apply: (tower) => {}
        }
    ],
    railgun: [
        {
            id: 'mikubeam',
            tier: 6,
            name: 'Miku Miku Beam',
            description: 'Miku Miku Beeeeeeaaammmm! Improves damage, attack speed, and gives infinite pierce/range.',
            //50 digipogs, change value later
            cost: 50,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'fastFiring',
            tier: 1,
            name: 'Fast Firing',
            description: 'Improved firing mechanism allowing for faster firing.',
            cost: 325,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'strongshells',
            tier: 2,
            name: 'Strong Shells',
            description: 'Enhanced shells that deal more damage and hit more enemies.',
            cost: 650,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'sturdyFrame',
            tier: 3,
            name: 'Sturdy Frame',
            description: 'A more robust frame that can handle increased stress. Increases damage and lifespan',
            cost: 1200,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'doubleBarrel',
            tier: 4,
            name: 'Double Barrel',
            description: 'Two barrels, doubling the number of projectiles.',
            cost: 2450,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'overdrive',
            tier: 5,
            name: 'Overdrive',
            description: 'Time to take this puppy into overdrive. Increased damage and pierce, but slower fire rate.',
            cost: 5500,
            apply: (tower) => {}
        }
    ],
    blaster: [
        {
            id: 'plankton',
            tier: 6,
            name: 'Maximum Overdrive',
            description: 'Im shifting into MAXIMUM OVERDRIVE! Increased fire rate and range.',
            //50 digipogs, change value later
            cost: 50,
            apply: (tower) => {}
        }
    ],
    gambler: [
        {
            id: 'luckyCharm',
            tier: 1,
            name: 'Lucky Charm',
            description: 'A lucky charm that allows you to try your luck and get a different tower/upgrade.',
            //50 digipogs, change value later
            cost: 50,
            apply: (tower) => {}
        }
    ],
    hacker: [
        {
            id: 'swiftSkills',
            tier: 1,
            name: 'Swift Skills',
            description: 'Improved hacking skills allowing for faster hacking.',
            cost: 1325,
            apply: (tower) => {}
        }
    ],
    hacker: [
        {
            id: 'hackerKnowledge',
            tier: 2,
            name: 'Hacker Knowledge',
            description: 'Enhanced abilities allow for deeper system access. Make some more money per hack.',
            cost: 3975,
            apply: (tower) => {}
        }
    ],
    hacker: [
        {
            id: 'malwareExpert',
            tier: 3,
            name: 'Malware Expert',
            description: 'Advanced malware  allow for more sophisticated attacks and double the payout per hack.',
            cost: 15000,
            apply: (tower) => {}
        }
    ],
    hacker: [
        {
            id: 'systemOverride',
            tier: 4,
            name: 'System Override',
            description: 'Time to make the big bucks! Override system controls to generate more money and triple the amount per hack.',
            cost: 63500,
            apply: (tower) => {}
        }
    ],
    hacker: [
        {
            id: 'merkman',
            tier: 5,
            name: 'The Merkman',
            description: 'Wait, I know that guy! How did he get here? Merkert will periodically remove specail states from enemies',
            //50 digipogs, change value later
            cost: 50,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'swiftSummon',
            tier: 1,
            name: 'Swift Summon',
            description: 'Summons enemies more quickly and in greater numbers.',
            cost: 850,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'strongSummons',
            tier: 2,
            name: 'Strong Summons',
            description: 'Summoned enemies are move with haste and are more powerful.',
            cost: 1900,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'greaterSummons',
            tier: 3,
            name: 'Greater Summons',
            description: 'Summon enemis in even greater numbers and some have increased speed.',
            cost: 3500,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'bigbad',
            tier: 4,
            name: 'Big Bad fella',
            description: 'Summons a boss among your minions.',
            cost: 3500,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'hordeArmy',
            tier: 5,
            name: 'Horde Army',
            description: 'Summons a horde of enemies to overwhelm your foes. Spawn count is doubled but less frequent.',
            cost: 7500,
            apply: (tower) => {}
        }
    ],
    overlord: [
        {
            id: 'chickenJockey',
            tier: 6,
            name: 'Chicken Jockey',
            description: 'Chicken Jockeys! Peck your enemies eyes out. Increased spawn count and speed with less summon speed.',
            //50 digipogs, change value later
            cost: 50,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'heavyPayload',
            tier: 1,
            name: 'Heavy Payload',
            description: 'Big boom hehe. Increased area and damage.',
            cost: 650,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'laserGuidance',
            tier: 2,
            name: 'Laser Guidance',
            description: 'A laser guidance system that allows for more accurate range.',
            cost: 1500,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'fastReload',
            tier: 3,
            name: 'Fast Reload',
            description: 'Reloads quicker for more destruction faster.',
            cost: 4000,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'aerodynamicShells',
            tier: 4,
            name: 'Aerodynamic Shells',
            description: 'Improved aerodynamics for faster firing and piercing.',
            cost: 9800,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'clusterBomb',
            tier: 5,
            name: 'Cluster Bomb',
            description: 'Fire a wave of 5 rockets with increased damage.',
            cost: 12000,
            apply: (tower) => {}
        }
    ],
    boomer: [
        {
            id: 'cluster',
            tier: 6,
            name: 'Cluster F***',
            description: 'Youre gonna want to get in a vault for this one! Whenever a bomb explodes release a ring of smaller bombs around the area. ',
            //50 digipogs, change value later.
            cost: 50,
            apply: (tower) => {}
        }
    ],
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
        this.pierce = def.pierce || 1;
        this.seeHidden = !!def.seeHidden;

        this.level = 1;
        this.appliedUpgradeIds = [];

        this.fireCooldown = 0;
        this.target = null;
        this.showRange = false;
    }

    getAvailableUpgrades() {
        const options = TOWER_UPGRADES[this.type] || [];
        return options.filter(upgrade => !this.appliedUpgradeIds.includes(upgrade.id));
    }

    canAffordNextUpgrade(money) {
        const [nextUpgrade] = this.getAvailableUpgrades();
        if (!nextUpgrade) return false;
        return money >= nextUpgrade.cost;
    }

    applyUpgrade(upgradeId) {
        const availableUpgrades = this.getAvailableUpgrades();
        const upgrade = availableUpgrades.find(item => item.id === upgradeId);
        if (!upgrade) return null;

        upgrade.apply(this);
        this.appliedUpgradeIds.push(upgrade.id);
        this.level += 1;
        return upgrade;
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
            if (enemy.hidden && !this.seeHidden) return;
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
            bullet.pierce = this.pierce || 1;
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
