type Constructable<T> = new (...args: any[]) => T;
type Mx<T> = (base: any) => Constructable<T>;

export function mix<A, B, C, D, E, F>(
  a: Mx<A>,
  b: Mx<B>,
  c: Mx<C>,
  d: Mx<D>,
  e: Mx<E>,
  f: Mx<F>
): Constructable<A & B & C & D & E & F>;
export function mix<A, B, C, D, E>(
  a: Mx<A>,
  b: Mx<B>,
  c: Mx<C>,
  d: Mx<D>,
  e: Mx<E>
): Constructable<A & B & C & D & E>;
export function mix<A, B, C, D>(
  a: Mx<A>,
  b: Mx<B>,
  c: Mx<C>,
  d: Mx<D>
): Constructable<A & B & C & D>;
export function mix<A, B, C>(
  a: Mx<A>,
  b: Mx<B>,
  c: Mx<C>
): Constructable<A & B & C>;
export function mix<A, B>(a: Mx<A>, b: Mx<B>): Constructable<A & B>;
export function mix<A>(a: Mx<A>): Constructable<A>;
export function mix(...mixins: Mx<any>[]) {
  return mixins.reduce((clazz, mixin) => mixin(clazz), class {});
}
