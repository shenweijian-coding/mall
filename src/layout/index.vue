<template>
  <a-layout class="vab-layout-wrap">
    <div
      v-if="device === 'mobile' && !collapse"
      class="vab-mask"
      @click="handleFoldSideBar"
    ></div>
    <a-layout-sider
      collapsible
      class="vab-sider"
      width="180"
      v-model:collapsed="collapse"
      :class="classObj"
      :trigger="null"
    >
      <!-- <vab-logo /> -->
      <a-menu
        class="vab-menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
      >
        <vab-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <div class="vab-menu-child">
      <div class="bg-white text-center child-menu-header border-right text-500">
        {{ topRoute?.meta?.title }}
      </div>
      <a-menu
        class="vab-menu fs-14"
        theme="light"
        mode="inline"
        v-model:selectedKeys="childSelectedKeys"
      >
        <vab-menu
          v-for="route in childRoutes"
          :key="route.path"
          :item="route"
        />
      </a-menu>
    </div>
    <a-layout
      class="vab-layout"
      :class="'mobile' === device ? 'vab-mobile-layout' : ''"
    >
      <a-layout-header class="vab-header">
        <a-row>
          <a-col
            class="flex ai-center"
            :xs="12"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
          >
            <breadcrumb />
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <vab-avatar />
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- <vab-tabs /> -->
      <vab-content />
    </a-layout>
  </a-layout>
</template>
<script>
  // import VabLogo from './vab-logo'
  import VabAvatar from './vab-avatar'
  import VabMenu from './vab-menu'
  // import VabTabs from './vab-tabs'
  import VabContent from './vab-content'
  import { mapActions, mapGetters } from 'vuex'
  import breadcrumb from './breadcrumb'

  export default {
    components: {
      // VabLogo,
      VabAvatar,
      VabMenu,
      // VabTabs,
      VabContent,
      breadcrumb,
    },
    data() {
      return {
        selectedKeys: [],
        childSelectedKeys: [],
        topRoute: undefined,
      }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        routes: 'routes/routes',
        device: 'settings/device',
      }),
      classObj() {
        return {
          'vab-mobile': this.device === 'mobile',
          'vab-collapse': this.collapse,
        }
      },
      childRoutes() {
        if (this.selectedKeys[0]) {
          return this.routes.find((route) => route.path == this.selectedKeys[0])
            .children
        }
        return []
      },
    },
    watch: {
      $route: {
        handler({ path, matched }) {
          console.log(path, matched)
          this.topRoute = matched?.[0]
          if (matched[0].children.length > 1) {
            this.selectedKeys = [matched[0].path]
            this.childSelectedKeys = [matched[1].meta?.belong || path]
          } else {
            this.selectedKeys = [matched[0].path]
            this.childSelectedKeys = [matched[1].path]
          }
        },
        immediate: true,
      },
    },
    beforeMount() {
      window.addEventListener('resize', this.handleLayouts)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleLayouts)
    },
    mounted() {
      this.handleLayouts()
      console.log(this.$route)
    },
    methods: {
      ...mapActions({
        toggleDevice: 'settings/toggleDevice',
        handleFoldSideBar: 'settings/foldSideBar',
        toggleCollapse: 'settings/toggleCollapse',
      }),
      handleLayouts() {
        const width = document.body.getBoundingClientRect().width
        if (this.width !== width) {
          const isMobile = width - 1 < 992
          this.toggleDevice(isMobile ? 'mobile' : 'desktop')
          this.width = width
        }
      },
    },
  }
</script>
<style lang="less">
  .vab-layout-wrap {
    .vab-sider {
      position: fixed;
      left: 0;
      height: 100vh;
      overflow: auto;
    }
    .vab-menu-child {
      margin-left: 180px;
      .child-menu-header {
        height: @vab-header-height;
        line-height: @vab-header-height;
      }
    }
    .vab-menu {
      height: calc(100vh - @vab-header-height);
    }
    .vab-layout {
      padding-left: 0px;
      transition: all 0.2s;
    }
    .vab-mobile-layout {
      padding-left: 0;
      transition: all 0.2s;
    }
    .vab-collapse {
      .vab-logo .anticon + span {
        display: inline-block;
        max-width: 0;
        opacity: 0;
        transition: all 0.2s;
      }
      & + .vab-layout {
        padding-left: 81px;
        transition: all 0.2s;
      }
    }
    .vab-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }
    .vab-mobile {
      position: fixed !important;
      z-index: 999;
      &.vab-collapse {
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
        * {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        .ant-menu-item,
        .ant-menu-submenu {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        & + .vab-layout {
          padding-left: 0px !important;
          transition: all 0.2s;
        }
      }
    }
    .vab-header {
      background: #fff;
      padding: 0 @vab-padding;
      .ant-col + .ant-col {
        display: flex;
        justify-content: flex-end;
        padding: 0 @vab-padding;
      }
      .trigger {
        height: @vab-header-height;
        padding: 0 @vab-padding;
        font-size: 18px;
        line-height: @vab-header-height;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>
