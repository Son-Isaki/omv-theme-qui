# OMV Qui Clean Dark

A clean, compact dark theme for the **OpenMediaVault 8** web interface, inspired by the visual style of [qui](https://github.com/autobrr/qui).

Built as a custom CSS layer for **OpenMediaVault ThemeKit**. The goal is to make OMV feel more consistent and less cluttered without changing how the interface works.

> This is an **unofficial community theme**. It is not affiliated with OpenMediaVault, ThemeKit, or qui. It only changes the presentation of the web interface; it does not change NAS configuration or services.

## Requirements

- OpenMediaVault **8**
- [OpenMediaVault ThemeKit](https://github.com/snakkarike/openmediavault-themekit) installed and working

The CSS was developed against an OMV 8 interface using Angular Material's legacy `mat-*` components and `ngx-datatable`. Other OMV or plugin versions may render differently.

## Installation

1. Download [`dist/omv-theme-qui.css`](./omv-theme-qui.css) from this repository.
2. Open your OpenMediaVault web interface.
3. Go to **System → Theme Kit → Custom CSS**.
4. Paste the entire contents of the CSS file into the editor.
5. Enable custom CSS, then **Save** and **Apply** if prompted.
6. Hard-refresh the browser (`Ctrl + Shift + R`).

For a consistent appearance, use **Simple Dark** as the ThemeKit base theme. **Geist** is a recommended font if available in your ThemeKit typography settings.

## Updating

Replace the entire Custom CSS content with the stylesheet from the newer release; do not append successive versions, as older rules may conflict.

## Uninstall / restore

Disable **Custom CSS** in ThemeKit (or clear the custom stylesheet), save, and refresh the page. No OMV system files need to be modified.

## Design reference

The visual direction is inspired by qui, but OMV and qui have different component structures; an exact one-to-one layout is not always possible with CSS alone.

## Credits

- [OpenMediaVault](https://www.openmediavault.org/) — NAS management interface
- [ThemeKit](https://github.com/snakkarike/openmediavault-themekit) — custom theme and CSS integration
- [qui](https://github.com/autobrr/qui) — visual inspiration

## License

No license is declared in this README. Add a `LICENSE` file if you want to specify how others may use, modify, or redistribute the theme.
