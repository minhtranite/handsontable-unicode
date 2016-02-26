(function (Handsontable) {
  var UnicodeEditor = Handsontable.editors.TextEditor.prototype.extend();

  UnicodeEditor.prototype.createElements = function () {
    Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments);
    this.unicodeModal = document.createElement('DIV');
    Handsontable.Dom.addClass(this.unicodeModal, 'unicode-modal');
    this.unicodeModal.style.display = 'none';
    this.modalOpened = false;
    this.instance.rootElement.appendChild(this.unicodeModal);
  };

  UnicodeEditor.prototype.prepare = function () {
    Handsontable.editors.TextEditor.prototype.prepare.apply(this, arguments);
    var self = this;
    var characterGroups = this.cellProperties.characters || [];
    var modalInner = document.createElement('DIV');
    Handsontable.Dom.addClass(modalInner, 'unicode-modal-inner');

    characterGroups.forEach(function (characterGroup) {
      var group = document.createElement('DIV');
      Handsontable.Dom.addClass(group, 'character-group');
      var groupHeading = document.createElement('DIV');
      Handsontable.Dom.addClass(groupHeading, 'character-group-heading');
      var groupBody = document.createElement('DIV');

      Handsontable.Dom.addClass(groupBody, 'character-group-body');
      groupHeading.innerHTML = '<h1>' + characterGroup.name || '' + '</h1>';

      var characters = characterGroup.characters || [];
      characters.forEach(function (character) {
        var characterEl = document.createElement('span');
        Handsontable.Dom.addClass(characterEl, 'character');
        characterEl.addEventListener('click', function (event) {
          var character = event.target.innerHTML;
          self.setValue(self.getValue() + character);
          self.refreshDimensions();
        });
        characterEl.innerHTML = character;
        groupBody.appendChild(characterEl);
      });

      group.appendChild(groupHeading);
      group.appendChild(groupBody);
      modalInner.appendChild(group);
    });

    var form = document.createElement('FORM');
    Handsontable.Dom.addClass(form, 'character-from');
    var formInner = document.createElement('DIV');
    Handsontable.Dom.addClass(formInner, 'character-from-inner');
    var input = document.createElement('INPUT');
    Handsontable.Dom.addClass(input, 'character-form-input');
    input.setAttribute('type', 'text');
    var preview = document.createElement('DIV');
    Handsontable.Dom.addClass(preview, 'character-form-preview');
    preview.style.display = 'none';
    input.addEventListener('keyup', function (event) {
      preview.innerHTML = event.target.value;
      if (event.target.value.length > 0) {
        preview.style.display = '';
      } else {
        preview.style.display = 'none';
      }
    });
    input.addEventListener('blur', function () {
      preview.style.display = 'none';
    });
    var buttonWrapper = document.createElement('DIV');
    Handsontable.Dom.addClass(buttonWrapper, 'character-form-button');
    var button = document.createElement('BUTTON');
    button.setAttribute('type', 'submit');
    button.innerHTML = 'Submit';
    buttonWrapper.appendChild(button);
    formInner.appendChild(input);
    formInner.appendChild(buttonWrapper);
    formInner.appendChild(preview);
    form.appendChild(formInner);
    modalInner.appendChild(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      self.setValue(self.getValue() + preview.innerHTML);
      self.refreshDimensions();
      input.value = '';
      preview.innerHTML = '';
      preview.style.display = 'none';
    });

    Handsontable.Dom.empty(this.unicodeModal);
    this.unicodeModal.appendChild(modalInner);
  };

  UnicodeEditor.prototype.open = function () {
    Handsontable.editors.TextEditor.prototype.open.apply(this, arguments);
    var height = Handsontable.Dom.outerHeight(this.TD);
    var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
    var tdOffset = Handsontable.Dom.offset(this.TD);

    this.unicodeModal.style.position = 'absolute';
    this.unicodeModal.style.top = tdOffset.top - rootOffset.top + height + 'px';
    this.unicodeModal.style.left = tdOffset.left - rootOffset.left + 'px';
    this.instance.addHook('beforeKeyDown', this.onBeforeKeyDown);
  };

  UnicodeEditor.prototype.close = function () {
    this.hideModal();
    this.instance.removeHook('beforeKeyDown', this.onBeforeKeyDown);
    Handsontable.editors.TextEditor.prototype.close.apply(this, arguments);
  };

  UnicodeEditor.prototype.onBeforeKeyDown = function (event) {
    var instance = this;
    var editor = instance.getActiveEditor();

    if (event.ctrlKey && event.keyCode === 32) {
      editor.showModal();
    }

    if (event.keyCode === 27 && editor.modalOpened) {
      editor.hideModal();
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  };

  UnicodeEditor.prototype.showModal = function () {
    this.modalOpened = true;
    this.unicodeModal.style.display = '';
  };

  UnicodeEditor.prototype.hideModal = function () {
    this.modalOpened = false;
    this.unicodeModal.style.display = 'none';
  };

  var UnicodeRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    td.innerHTML = value;
    return td;
  };

  Handsontable.editors.UnicodeEditor = UnicodeEditor;
  Handsontable.editors.registerEditor('unicode', UnicodeEditor);
  Handsontable.renderers.UnicodeRenderer = UnicodeRenderer;
  Handsontable.renderers.registerRenderer('unicode', UnicodeRenderer);

  Handsontable.cellTypes.unicode = {
    editor: Handsontable.editors.UnicodeEditor,
    renderer: Handsontable.renderers.UnicodeRenderer
  };
})(Handsontable);