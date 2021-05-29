class Container {
  private _providers: { [key: string]: any } = {};

  get providers() {
    return this._providers;
  }

  public resolve(token: string) {
    const matchedProvider = this._providers[token];

    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for "${token}"`);
    }
  }
}

export const container = new Container();
