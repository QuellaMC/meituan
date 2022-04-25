  function submitOrder(count) {
    checkall();
    submitBtn = textStartsWith("结算(").findOne();
    if (!submitBtn) {
      toast("没找到结算按钮");
      exit;
    }
    submitBtn.parent().click();
    sleep(1000);
  
    const wzdl = className("android.widget.TextView").text("我知道了").findOne(); //此处"我知道了"可以替换为你软件里弹出的跳窗的点击按键上的文字，例如"返回购物车"
    if (wzdl) {
      toast("关闭我知道了");
      wzdl.parent().click();
    }
  
    sleep(200);
    if (count > 15000) {
      toast("没抢到");
      exit;
    }
    count = count++;
    submitOrder(count);
  }
  
  function checkall() {
    const isCheckedAll = textStartsWith("结算(").exists();
    const checkAllBtn = text("全选").findOne();
    if (!!checkAllBtn) {
      !isCheckedAll && checkAllBtn.parent().click();
      sleep(1000);
    } else {
      toast("没找到全选按钮");
      exit;
    }
}
  
  launchApp("美团买菜");
  waitForPackage("com.meituan.retail.v.android", 200);
  auto.waitFor();
  const btn_skip = id("btn_skip").findOne();
  if (btn_skip) {
    btn_skip.click();
    toast("已跳过首屏广告");
  }
  sleep(1000);
  const buyCarBtn = id("cartredDotTextView").findOne();
  if (buyCarBtn) {
    buyCarBtn.parent().click();
    toast("已进入购物车");
  } else {
    toast("没找到购物车");
    exit;
  }
  sleep(1000);
  submitOrder(1);
  