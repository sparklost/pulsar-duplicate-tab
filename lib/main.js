const { CompositeDisposable } = require("atom");

module.exports = {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add("atom-pane", {
        "duplicate-tab:duplicate": (event) => this.duplicate(event),
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  duplicate(event) {
    const paneEl = event.target;
    const pane = paneEl.getModel ? paneEl.getModel() : atom.workspace.getActivePane();
    item = pane.getActiveItem();
    if (!item) return;

    // add new tab and set scroll position
    if (typeof item.copy === "function") {
      const copy = item.copy();
      if (copy) {
        const index = pane.getItems().indexOf(item);
        pane.addItem(copy, { index: index + 1 });
        pane.activateItem(copy);
        if (typeof item.getScrollTopRow === "function") {
          setImmediate(() => {
            try { copy.setScrollTopRow(item.getScrollTopRow()); } catch (_) {}
          });
        }
        return;
      }
    }
  },
};
