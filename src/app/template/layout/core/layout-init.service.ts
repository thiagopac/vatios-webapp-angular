import { Injectable } from '@angular/core';
import { ILayout } from './default-layout.config';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutInitService {
  constructor(private layout: LayoutService) {}

  init() {
    this.layout.initConfig();

    // init base layout
    this.initLayout();
    this.initHeader();
    this.initPageTitle();
    this.initToolbar();
    this.initContent();
    this.initFooter();
  }

  update(fieldsToUpdate: Partial<ILayout>) {
    this.layout.updateConfig(fieldsToUpdate);
    this.initLayout();
    this.initHeader();
    this.initPageTitle();
    this.initToolbar();
    this.initContent();
    this.initFooter();
  }

  private initLayout() {
    document.body.setAttribute('style', '');
    document.body.setAttribute('id', 'kt_body');
    const selfBodyBackgroundImage = this.layout.getProp(
      'main.body.backgroundImage'
    );
    if (selfBodyBackgroundImage) {
      document.body.style.backgroundImage = `url("${selfBodyBackgroundImage}")`;
    }

    const selfBodyClass = (
      this.layout.getProp('main.body.class') || ''
    ).toString();
    if (selfBodyClass) {
      const bodyClasses: string[] = selfBodyClass.split(' ');
      bodyClasses.forEach((cssClass) => document.body.classList.add(cssClass));
    }
  }

  private initHeader() {
    this.layout.setCSSClass(
      'headerContainer',
      this.layout.getProp('header.width') === 'fluid'
        ? 'container-fluid'
        : 'container-xxl'
    );

    const fixedDesktop = this.layout.getProp('header.fixed.desktop') as boolean;
    if (fixedDesktop) {
      document.body.classList.add('header-fixed');
    }

    const tabletAndMobile = this.layout.getProp(
      'header.fixed.tabletAndMobile'
    ) as boolean;
    if (tabletAndMobile) {
      document.body.classList.add('header-tablet-and-mobile-fixed');
    }
  }

  private initPageTitle() {
    const display = this.layout.getProp('pageTitle.display') as boolean;
    if (!display) {
      return;
    }

    const direction = this.layout.getProp('pageTitle.direction') as string;
    if (direction === 'column') {
      this.layout.setCSSClass('pageTitle', 'flex-column');
      this.layout.setCSSClass('pageTitle', 'align-items-start');
    } else {
      this.layout.setCSSClass('pageTitle', 'align-items-center');
      this.layout.setCSSClass('pageTitle', 'flex-wrap');
    }
    this.layout.setCSSClass('pageTitle', 'me-3');

    const responsive = this.layout.getProp('pageTitle.responsive') as boolean;

    if (responsive) {
      this.layout.setCSSClass('pageTitle', 'mb-5');
      this.layout.setCSSClass('pageTitle', 'mb-lg-0');
      this.layout.setHTMLAttribute('pageTitle', 'data-kt-swapper', true);
      this.layout.setHTMLAttribute(
        'pageTitle',
        'data-kt-swapper-mode',
        'prepend'
      );

      const responsiveBreakpoint = this.layout.getProp(
        'pageTitle.responsiveBreakpoint'
      ) as string;
      const responsiveTarget = this.layout.getProp(
        'pageTitle.responsiveTarget'
      ) as string;
      this.layout.setHTMLAttribute(
        'pageTitle',
        'data-kt-swapper-parent',
        `{ default: '#kt_content_container', '${responsiveBreakpoint}': '${responsiveTarget}'}`
      );
    }
  }

  private initToolbar() {
    const display = this.layout.getProp('toolbar.display') as boolean;
    if (!display) {
      return;
    }

    document.body.classList.add('toolbar-enabled');
    const widthClass = this.layout.getProp('toolbar.width') as string;
    this.layout.setCSSClass(
      'toolbarContainer',
      widthClass === 'fluid' ? 'container-fluid' : 'container-xxl'
    );

    const fixedDesktop = this.layout.getProp(
      'toolbar.fixed.desktop'
    ) as boolean;
    if (fixedDesktop) {
      document.body.classList.add('toolbar-fixed');
    }

    const fixedTabletAndMobileMode = this.layout.getProp(
      'toolbar.fixed.tabletAndMobileMode'
    ) as boolean;
    if (fixedTabletAndMobileMode) {
      document.body.classList.add('toolbar-tablet-and-mobile-fixed');
    }

    // Height setup
    const type = this.layout.getProp('toolbar.layout') as string;
    if (type === 'toolbar1') {
      const height = this.layout.getProp(
        'toolbar.layouts.toolbar1.height'
      ) as string;
      const heightAndTabletMobileMode = this.layout.getProp(
        'toolbar.layouts.toolbar1.heightAndTabletMobileMode'
      ) as string;

      const imagePath = this.layout.getProp(
        'main.body.backgroundImage'
      ) as string;
      if (imagePath) {
        let bodyStyles: string = 'background-image: url(' + imagePath + ')';
        document.body.setAttribute('style', bodyStyles);
      }
    }
  }

  private initContent() {
    const width = this.layout.getProp('content.width') as string;
    this.layout.setCSSClass(
      'contentContainer',
      width === 'fluid' ? 'container-fluid' : 'container-xxl'
    );
  }

  private initFooter() {
    const width = this.layout.getProp('footer.width') as string;
    this.layout.setCSSClass(
      'footerContainer',
      width === 'fluid' ? 'container-fluid' : 'container-xxl'
    );
  }
}
