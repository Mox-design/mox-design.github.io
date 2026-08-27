(function(){
  var slug=location.pathname.split('/').filter(Boolean).pop();
  if(slug==='hopbear')return;
  var typeByCase={
    duotrampoline:'active',bobbi:'active',lionking:'active',
    duobike:'motion',duoski:'motion',tricycle:'motion',rabbitrun:'motion',snowbear:'motion',
    gunhero:'shooting',ledtheater:'ride',bermuda:'ride',spaceship:'ride',tirecar:'ride',
    foodmatch:'touch',snowboxing:'touch'
  };
  var type=typeByCase[slug];if(!type)return;
  var profiles={
    active:{
      label:'运动平台设备',
      constraints:[
        ['SAFETY','动作安全','用围合扶手、柔和边界与明确入口建立运动区域，外观避开可能造成碰撞、夹伤或误入的尖锐和模糊结构。','影响：开口、圆角、软包、身体边界'],
        ['SIZE & STRUCTURE','尺寸与结构','围绕玩家站位、动作范围、屏幕视线和扶手抓握组织比例，关键安全距离与受力结构在深化阶段协同校核。','影响：站位、视线、通行、结构连接'],
        ['PRODUCTION COST','量产成本','识别度集中在主轮廓、冠部和关键色彩，主体优先采用可重复的管件、板件与软包语言，控制复杂异形装饰。','影响：零件数量、工艺选择、装配工时'],
        ['PACKING & SHIPPING','包装运输','显示机柜、运动平台与顶部主题件保持清楚的模块关系，控制外伸件和不可拆体量，兼顾包装及现场复装。','影响：模块拆分、外伸尺寸、包装体积']
      ],
      rows:[['安全结构','让扶手和软包同时承担保护功能与主造型语言。','减少附加装饰'],['主体构件','重复圆管、圆角和板件规格，避免无必要的截面变化。','控制定制复杂度'],['主题表达','立体识别集中在冠部，侧板以可替换平面图形延展故事。','成本集中于视觉焦点'],['模块拆分','平台、机柜与冠部保持独立装配层级。','支持包装与现场复装'],['维护区域','高频接触区减少复杂贴图和易损突出件。','降低磨损与维护影响']]
    },
    motion:{
      label:'多人竞速与模拟设备',
      constraints:[
        ['SAFETY','动作与站位','扶手、踏板或跑台需要形成明确身体边界，多人站位彼此可分辨，同时为上下设备和工作人员协助留出通道。','影响：站位间距、抓握、入口、侧向空间'],
        ['SIZE & STRUCTURE','人体与设备比例','屏幕高度、操作位置、运动行程和机柜结构共同决定整体比例，外观必须服从真实姿态和机构包络。','影响：视线、动作包络、重心、检修空间'],
        ['PRODUCTION COST','重复模块','多人产品优先让相同站位共用结构与外观语言，用重复件建立秩序，减少左右或多工位的独立开模与加工。','影响：通用件、工位复制、装配效率'],
        ['PACKING & SHIPPING','分体运输','机柜、操作模块和前置运动机构形成可拆层级，避免产品长度或宽度全部固化在单一包装单元中。','影响：最长件、包装单元、现场定位']
      ],
      rows:[['多人站位','通过重复模块和色彩编码区分玩家，保持整体对称秩序。','减少专用零件'],['运动机构','外观避让真实行程、连接点和检修区域。','降低返工风险'],['扶手与接触件','统一管径、圆角和表面语言。','便于加工与替换'],['图形系统','主题画面落在固定板件，操作区控制信息密度。','便于换版维护'],['运输拆分','高柜与前置动作模块分别包装、现场定位。','控制包装长度']]
    },
    shooting:{
      label:'多人射击设备',
      constraints:[
        ['SAFETY','操作安全','枪体、枪线和站位边缘不能进入相邻玩家的动作区域；外观需要清楚提示取放、握持和归位位置。','影响：枪架、线缆、圆角、站位边界'],
        ['SIZE & STRUCTURE','四人空间','四个操作站围绕共享屏幕组织，既要保证独立操作距离，也要控制弧形操作台的总宽与观看角度。','影响：站位间距、台面弧度、屏幕视线'],
        ['PRODUCTION COST','硬件整合','用连续台面和重复枪架收纳复杂硬件，减少每个站位独立造型；灯光只强调边界和交互节点。','影响：重复件、线缆收纳、灯带数量'],
        ['PACKING & SHIPPING','前后台拆分','显示端与操作端保持两个清楚体量，便于分别包装、运输和现场连接，降低超大整体结构的运输压力。','影响：连接界面、包装宽度、复装定位']
      ],
      rows:[['枪架模块','四个站位使用相同安装和外观规格。','提高通用性'],['操作台','用连续弧面整合投币、枪线和控制硬件。','减少视觉与装配碎片'],['显示机柜','屏幕框与支撑结构保持独立完整。','便于前后台拆分'],['灯光节点','灯带集中于轮廓和分区边界。','控制用量与维护'],['高频接触区','深色耐用表面隐藏磨损和线缆。','延长视觉寿命']]
    },
    ride:{
      label:'大型座舱与动感设备',
      constraints:[
        ['SAFETY','上下客与围合','入口、踏步、扶手和座舱边界需要被快速识别，主题外壳不能遮挡上下客路线、工作人员观察或紧急离开。','影响：入口、栏杆、踏步、观察面'],
        ['SIZE & STRUCTURE','承载与机构包络','多人座椅、动感机构、底座及外壳共同形成大体量，外观需要尊重承载、重心、活动范围与检修空间。','影响：座舱比例、底座、机构避让、检修口'],
        ['PRODUCTION COST','大体量控制','通过完整主轮廓和少量高识别节点建立主题，减少大面积复杂曲面与零散装饰，把预算留给入口、座舱和灯光焦点。','影响：壳体分块、曲面数量、装饰件'],
        ['PACKING & SHIPPING','大件拆分','座舱、底座、侧壳和顶部或尾部主题件需要形成可运输模块，分缝同时服务包装尺寸、吊装与现场复装。','影响：最大单件、分缝、吊装、装柜']
      ],
      rows:[['主承载体','用连续侧壳或舱体包住多人座椅。','减少零散外观件'],['入口系统','踏步、扶手和开口共享清楚的进入语言。','提升上下客识别'],['大型壳体','主动规划分块与分缝，避免无必要的复杂曲面。','控制加工与装配成本'],['灯光与透明件','集中在悬浮边缘、动力节点或方向线。','用少量节点建立主题'],['运输模块','座舱、底座与主题附件分级拆装。','控制最大包装单元']]
    },
    touch:{
      label:'互动与紧凑型设备',
      constraints:[
        ['SAFETY','接触与动作区域','圆角外框、稳定台面和清楚的操作目标减少误触与碰撞；高频接触部位需要兼顾耐磨、清洁和替换。','影响：边缘、台面、目标间距、材料'],
        ['SIZE & STRUCTURE','可达范围','屏幕、触控面或击打目标围绕真实站姿和手臂动作布置，同时避让内部主机、传感器与检修空间。','影响：高度、深度、动作范围、内部布局'],
        ['PRODUCTION COST','紧凑结构','用一个稳定主机柜整合显示、操作和硬件，主题以顶标、色彩和可替换图形完成，避免小体量堆叠过多立体件。','影响：壳体数量、标准件、装饰方式'],
        ['PACKING & SHIPPING','体积效率','控制突出操作件和顶标高度，优先让设备保持规整包装边界；必要附件可单独固定或拆装。','影响：外廓、附件保护、包装效率']
      ],
      rows:[['主机柜','用连续圆角壳体整合显示、操作和内部硬件。','减少壳体数量'],['操作目标','重复相同结构规格，用色彩建立动作焦点。','提高零件通用性'],['主题图形','集中在顶标、边框和非接触大面。','方便印刷换版'],['高频接触面','控制装饰密度并考虑耐磨清洁。','降低维护影响'],['包装外廓','减少不可拆突出件，附件独立保护。','提升体积效率']]
    }
  };
  var p=profiles[type];
  document.body.classList.add('case-production-upgraded');
  var css=document.createElement('link');css.rel='stylesheet';css.href='/case-production-upgrade.css';document.head.appendChild(css);
  var nav=document.querySelector('.site-header nav');
  var overview=document.querySelector('.overview');
  var decisions=document.querySelector('#form-logic')||document.querySelector('#decisions');
  var gallery=document.querySelector('#gallery')||document.querySelector('#outcome');
  if(nav)nav.innerHTML='<a href="'+(overview?'#'+overview.id:'#overview')+'">命题</a><a href="#constraints">约束</a><a href="'+(decisions?'#'+decisions.id:'#decisions')+'">决策</a><a href="#production">量产</a><a href="'+(gallery?'#'+gallery.id:'#gallery')+'">结果</a>';
  if(overview){
    var specs=overview.querySelector('.specs');
    var role=document.createElement('div');role.className='case-role';role.innerHTML='<span>MY ROLE</span><strong>产品外观设计师</strong><p>负责造型、主题平面与 CMF，并在方案推进中协同校核安全、尺寸结构、量产成本及包装运输。</p><small>'+p.label+'</small>';
    (specs||overview).after(role);
    var constraints=document.createElement('section');constraints.className='case-constraints';constraints.id='constraints';constraints.innerHTML='<div class="section-label"><span>02</span><span>REAL-WORLD CONSTRAINTS</span></div><div class="case-constraint-heading"><h2>现实约束，<br>也是造型输入。</h2><p>外观方案从第一轮就回应安全、尺寸结构、量产和运输，而不是完成造型后再被动修改。</p></div><div class="case-constraint-grid">'+p.constraints.map(function(x,i){return '<article><i>0'+(i+1)+'</i><small>'+x[0]+'</small><h3>'+x[1]+'</h3><p>'+x[2]+'</p><strong>'+x[3]+'</strong></article>';}).join('')+'</div>';
    overview.after(constraints);
  }
  var reflection=document.querySelector('.appearance-reflection')||document.querySelector('.reflection-section');
  var production=document.createElement('section');production.className='case-production';production.id='production';production.innerHTML='<div class="section-label"><span>07</span><span>DESIGN FOR PRODUCTION</span></div><div class="case-production-heading"><h2>让设计完整度，<br>延续到生产与运输。</h2><p>以下是外观方案主动控制的方向；最终材料规格、强度和结构尺寸由工程深化与样机验证确定。</p></div><div class="case-production-table"><div class="head"><span>控制项</span><span>外观设计回应</span><span>预期价值</span></div>'+p.rows.map(function(x){return '<div><b>'+x[0]+'</b><p>'+x[1]+'</p><strong>'+x[2]+'</strong></div>';}).join('')+'</div>';
  if(reflection)reflection.before(production);else if(gallery)gallery.after(production);
  document.querySelectorAll('main .section-label').forEach(function(label,i){var n=label.querySelector('span');if(n)n.textContent=String(i+1).padStart(2,'0');});
})();
