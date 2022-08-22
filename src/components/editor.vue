<template>
  <div class="editor-wrap" style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      :editor="editorRef"
      mode="default"
      :default-config="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
    ></Toolbar>
    <wangEditor
      v-model="valueHtml"
      mode="default"
      :default-config="editorConfig"
      style="height: 400px; overflow-y: hidden"
      @on-created="handleCreated"
      @on-change="handleChange"
      @on-destroyed="handleDestroyed"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
      @custom-alert="customAlert"
      @custom-paste="customPaste"
    ></wangEditor>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, reactive, onMounted, onBeforeUnmount } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Toolbar, Editor as wangEditor } from '@wangeditor/editor-for-vue';
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';

type InsertFnType = (url: string, alt: string, href: string) => void;

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = reactive({
  excludeKeys: ['fullscreen'],
});

// 内容 html
const valueHtml = ref('<p>hello 大赛</p>');

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = reactive({
  MENU_CONF: {
    uploadImage: {
      server: '/api/course/uploadImg',
      fieldName: 'file',
      allowFileTypes: ['image/*'],
      onSuccess(file: File, res: any) {
        console.log(`${file.name} 上传成功`, res);
      },
      customInsert(res: any, insertFn: InsertFnType) {
        if (res.code === 0) {
          const url = res.data.urlPath;
          insertFn(url, '', '');
        }
      },
    },
    fontSize: {
      fontSizeList: ['12px', '16px', '24px'],
    },
  },
  placeholder: '请输入内容',
});

onMounted(() => {});

onBeforeUnmount(() => {
  const noEditor = editorRef.value;
  if (noEditor) {
    noEditor.destory();
  }
});

// 编辑器创建回调函数
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// 编辑器更改回调
const handleChange = (editor: IDomEditor) => {
  // console.log('change:', editor.getHtml())
};
// 编辑器销毁回调
const handleDestroyed = (editor: IDomEditor) => {
  // console.log('destroyed', editor)
};
// 获取焦点
const handleFocus = (editor: IDomEditor) => {
  // console.log('focus', editor)
};
// 失去焦点
const handleBlur = (editor: IDomEditor) => {
  // console.log('blur', editor)
};
// 自定义提示
const customAlert = (info: string, type: string) => {
  // console.log(info, type)
};
// 粘贴事件
const customPaste = (editor: IDomEditor, event: Event, callback: Function) => {
  // 自定义插入内容
  // editor.insertText('xxx')

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false) // 返回 false ，阻止默认粘贴行为
  callback(true); // 返回 true ，继续默认的粘贴行为
};
</script>

<style lang="less" scoped></style>
