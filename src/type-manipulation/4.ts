/* keyof */
class Animal {
  type: string;
  weight: number;
  private speed: number;
}

type AnimalProps = keyof Animal; // "type" | "weight"
const a:AnimalProps = 'type'
const b:AnimalProps = 'weight'
const c:AnimalProps = 'speed' // error