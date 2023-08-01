export abstract class Entity<Props> {
  protected readonly _id: string;
  protected props: Props;
  constructor(props: Props, id: string) {
    this.props = props;
    this._id = id;
  }

  public updateProp(propsToUpdate: Partial<Props>) {
    this.props = { ...this.props, ...propsToUpdate };
    return this;
  }

  public getProps() {
    return this.props;
  }
}
