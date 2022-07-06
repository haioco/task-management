import React from 'react';
import Layout from "../@core/layouts/Layout";
import HorizontalNavItems from "../navigation/horizontal";
import HorizontalAppBarContent from "./components/horizontal/AppBarContent";
import VerticalNavItems from "../navigation/vertical";
import VerticalAppBarContent from "./components/vertical/AppBarContent";


type Props = {
  hidden: any,
  settings: any,
  saveSettings: any,
  children: React.ReactNode
}

const MainLayout = ({hidden,settings ,saveSettings, children} : Props) => {
  return (
    <div>
      <Layout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        {...(settings.layout === 'horizontal'
          ? {
            // ** Navigation Items
            horizontalNavItems: HorizontalNavItems(),

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // horizontalNavItems: ServerSideHorizontalNavItems(),

            // ** AppBar Content
            horizontalAppBarContent: () => (
              <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
            )
          }
          : {
            // ** Navigation Items
            verticalNavItems: VerticalNavItems(),

            // Uncomment the below line when using server-side menu in vertical layout and comment the above line
            // verticalNavItems: ServerSideVerticalNavItems(),

            // ** AppBar Content
            verticalAppBarContent: props => (
              <VerticalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={props.toggleNavVisibility}
              />
            )
          })}
      >
        {children}
      </Layout>
    </div>
  );
};

export default MainLayout;
