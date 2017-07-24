type Constructable<T> = new (...args: any[]) => T;
type Mixin<T> = (base: any) => Constructable<T>;

export function mix<A, B, C, D, E, F, G, H, I, J>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>,
  f: Mixin<F>,
  g: Mixin<G>,
  h: Mixin<H>,
  i: Mixin<I>,
  j: Mixin<J>
): Constructable<A & B & C & D & E & F & G & H & I & J>;
export function mix<A, B, C, D, E, F, G, H, I>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>,
  f: Mixin<F>,
  g: Mixin<G>,
  h: Mixin<H>,
  i: Mixin<I>
): Constructable<A & B & C & D & E & F & G & H & I>;
export function mix<A, B, C, D, E, F, G, H>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>,
  f: Mixin<F>,
  g: Mixin<G>,
  h: Mixin<H>
): Constructable<A & B & C & D & E & F & G & H>;
export function mix<A, B, C, D, E, F, G>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>,
  f: Mixin<F>,
  g: Mixin<G>
): Constructable<A & B & C & D & E & F & G>;
export function mix<A, B, C, D, E, F>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>,
  f: Mixin<F>
): Constructable<A & B & C & D & E & F>;
export function mix<A, B, C, D, E>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>,
  e: Mixin<E>
): Constructable<A & B & C & D & E>;
export function mix<A, B, C, D>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>,
  d: Mixin<D>
): Constructable<A & B & C & D>;
export function mix<A, B, C>(
  a: Mixin<A>,
  b: Mixin<B>,
  c: Mixin<C>
): Constructable<A & B & C>;
export function mix<A, B>(a: Mixin<A>, b: Mixin<B>): Constructable<A & B>;
export function mix<A>(a: Mixin<A>): Constructable<A>;
export function mix(...mixins: Mixin<any>[]) {
  return mixins.reduce((clazz, mixin) => mixin(clazz), class {});
}
