// Додаємо підтримку виконання TypeScript напряму через Node.js
import "ts-node/register";

// Enum для типів героїв
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER",
}

// Enum для типів атак
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED",
}

// Interface для характеристик героя
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface для героя
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Type для результату атаки
type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
};

// Функція створення нового героя
function createHero(name: string, type: HeroType): Hero {
    const baseStats: Record<HeroType, HeroStats> = {
        [HeroType.Warrior]: { health: 120, attack: 15, defense: 10, speed: 5 },
        [HeroType.Mage]: { health: 80, attack: 25, defense: 5, speed: 8 },
        [HeroType.Archer]: { health: 100, attack: 20, defense: 7, speed: 10 },
    };

    const attackTypeMap: Record<HeroType, AttackType> = {
        [HeroType.Warrior]: AttackType.Physical,
        [HeroType.Mage]: AttackType.Magical,
        [HeroType.Archer]: AttackType.Ranged,
    };

    return {
        id: Date.now(),
        name,
        type,
        attackType: attackTypeMap[type],
        stats: { ...baseStats[type] },
        isAlive: true,
    };
}

// Функція розрахунку пошкодження
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const { attack } = attacker.stats;
    const { defense } = defender.stats;

    // Базовий урон
    let damage = attack - defense / 2;
    damage = Math.max(0, damage);

    // Шанс критичного удару
    const isCritical = Math.random() < 0.2;
    if (isCritical) damage *= 2;

    // Оновлення здоров'я захисника
    defender.stats.health -= damage;
    defender.stats.health = Math.max(0, defender.stats.health);
    defender.isAlive = defender.stats.health > 0;

    return {
        damage: Math.round(damage),
        isCritical,
        remainingHealth: Math.round(defender.stats.health),
    };
}

// Generic функція для пошуку героя в масиві
function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.find((hero) => hero[property] === value);
}

// Функція проведення раунду бою між героями
function battleRound(hero1: Hero, hero2: Hero): string {
    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;

    const attackResult = calculateDamage(attacker, defender);

    let result = `${attacker.name} атакує ${defender.name}, завдаючи ${attackResult.damage} урону`;
    if (attackResult.isCritical) result += " (Критичний удар!)";
    result += ` Залишилось здоров'я ${defender.name}: ${attackResult.remainingHealth}`;

    if (!defender.isAlive) result += `
${defender.name} був переможений!`;
    return result;
}

// --- Практичне застосування ---

// Створюємо героїв
const hero1 = createHero("Дмитро", HeroType.Warrior);
const hero2 = createHero("Мерлін", HeroType.Mage);
const hero3 = createHero("Робін Гуд", HeroType.Archer);

const heroes: Hero[] = [hero1, hero2, hero3];

console.log("=== Створені герої ===");
console.log(heroes);

// Пошук героя за властивістю
console.log("\n=== Пошук героя за типом WARRIOR ===");
const foundHero = findHeroByProperty(heroes, "type", HeroType.Warrior);
console.log(foundHero);

// Проведення кількох раундів бою
console.log("\n=== Битва між героями ===");
console.log(battleRound(hero1, hero2));
if (hero2.isAlive) console.log(battleRound(hero2, hero1));

console.log("\n=== Фінальний статус героїв ===");
console.log(heroes);
