 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> 
 <style> 
  /*  https://fontawesome.com/icons?d=gallery&m=free  */    
  .fas { color : black; }   /*   fontawesome 에 style 추가. */  
  
 /*
	**  아이콘 사용 (font awesome)   * css 로 아이콘을 표기할 수 있는 아이콘 폰트
	    http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css
	       >> http://grace-go.tistory.com/42
	          http://ingijjung.tistory.com/6
	          http://alikerock.tistory.com/59     ★★ 	          
	          사용가능 아이콘 :  https://fontawesome.com/icons?d=gallery
*/	       

</style>

<script>
alert ('modal : ${modal}');
</script>
	
<div class="col-md-9 col-lg-10 main">

    <!--toggle sidebar button
    <p class="hidden-md-up">
        <button type="button" class="btn btn-primary-outline btn-sm" data-toggle="offcanvas"><i class="fa fa-chevron-left"></i> Menu</button>
    </p>-->

	<!--  TITLE   START 
    <h1 class="display-4 d-none d-sm-block">
    MuvMuv DashBoard 
    </h1>
    <p class="lead d-none d-sm-block">(with off-canvas sidebar, based on BS v4.0.0)</p>
 	TITLE   END  -->


    <a id="layouts"></a>
    <hr>
    
    <h2 class="sub-header mt-5">Interesting layouts and elements</h2>
    
    <!--  row Area START  ----------------------------------------------------->
    <div class="row mb-3">
  		<!-- card panes   START -->
        <div class="col-lg-6">
            <div class="card mb-3">
                <div class="card-header">
                    Bye .well, .panel &amp; .thumbnail
                </div>
                <div class="card-body">
                    <h4 class="card-title">Replaced with .card</h4>
                    <p class="card-text">All of these Bootstrap 3.x components have been dropped entirely for the new card component.</p>
                    <button type="button" class="btn btn-secondary btn-lg">Large</button>
                </div>
            </div>
        </div>
  		<!-- card panes   END -->
        
        <!-- Tab panes   START -->
        <div class="col-lg-6">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" href="#home1" role="tab" data-toggle="tab">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#profile1" role="tab" data-toggle="tab">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#messages1" role="tab" data-toggle="tab">Messages</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#settings1" role="tab" data-toggle="tab">Settings</a>
                </li>
            </ul>
            <div class="tab-content">
                <br>
                <div role="tabpanel" class="tab-pane active" id="home1">
                    <h4>Home</h4>
                    <p>
                        1. These Bootstrap 4 Tabs work basically the same as the Bootstrap 3.x tabs.
                        <br>
                        <br>
                        <button class="btn btn-primary-outline btn-lg">Wow</button>
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane" id="profile1">
                    <h4>Pro</h4>
                    <p>
                        2. Tabs are helpful to hide or collapse some addtional content.
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane" id="messages1">
                    <h4>Messages</h4>
                    <p>
                        3. You can really put whatever you want into the tab pane.
                    </p>
                </div>
                <div role="tabpanel" class="tab-pane" id="settings1">
                    <h4>Settings</h4>
                    <p>
                        4. Some of the Bootstrap 3.x components like well and panel have been dropped for the new card component.
                    </p>
                </div>
            </div>
        </div>
        <!-- Tab panes   END -->                
        
        <div class="clearfix"></div>                
        
        <!-- Tab panes 2   START -->
        <div class="col-lg-6">
            <div class="card card-default card-body">
                <ul id="tabsJustified" class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link" href="" data-target="#tab1" data-toggle="tab">List</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="" data-target="#tab2" data-toggle="tab">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="" data-target="#tab3" data-toggle="tab">More</a>
                    </li>
                </ul>
                <!--/tabs-->
                <br>
                <div id="tabsJustifiedContent" class="tab-content">
                    <div class="tab-pane" id="tab1">
                        <div class="list-group">
                            <a href="" class="list-group-item"><span class="float-right label label-success">51</span> Home Link</a>
                            <a href="" class="list-group-item"><span class="float-right label label-success">8</span> Link 2</a>
                            <a href="" class="list-group-item"><span class="float-right label label-success">23</span> Link 3</a>
                            <a href="" class="list-group-item text-muted">Link n..</a>
                        </div>
                    </div>
                    <div class="tab-pane active" id="tab2">
                        <div class="row">
                            <div class="col-sm-7">
                                <h4>Profile Section</h4>
                                <p>Imagine creating this simple user profile inside a tab card.</p>
                            </div>
                            <div class="col-sm-5"><img src="http://placehold.it/170" class="float-right img-responsive img-rounded"></div>
                        </div>
                        <hr>
                        <a href="javascript:;" class="btn btn-info btn-block">Read More Profiles</a>
                        <div class="spacer5"></div>
                    </div>
                    <div class="tab-pane" id="tab3">
                        <div class="list-group">
                            <a href="" class="list-group-item"><span class="float-right label label-info label-pill">44</span> <code>.panel</code> is now <code>.card</code></a>
                            <a href="" class="list-group-item"><span class="float-right label label-info label-pill">8</span> <code>.nav-justified</code> is deprecated</a>
                            <a href="" class="list-group-item"><span class="float-right label label-info label-pill">23</span> <code>.badge</code> is now <code>.label-pill</code></a>
                            <a href="" class="list-group-item text-muted">Message n..</a>
                        </div>
                    </div>
                </div>
                <!--/tabs content-->
            </div><!--/card--> 
        </div><!--/col-->
        <!-- Tab panes 2   END -->                
        
        <!-- accordion   START -->
        <div class="col-lg-6">
            <div id="accordion" role="tablist" aria-multiselectable="true">
              <div class="card">
                <div class="card-header" role="tab" id="headingOne"  data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Accordion example
                </div>
                <div id="collapseOne" class="card-block collapse in" role="tabpanel" aria-labelledby="headingOne">
                     <p>This is a Bootstrap 4 accordion that uses the <code>.card</code> classes instead of <code>.panel</code>. The single-open section aspect is not working because the parent option (dependent on .panel) has not yet been finalized in BS 4 alpha. </p>
                </div>
                <div class="card-header" role="tab" id="headingTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Mobile-first
                </div>
                <div id="collapseTwo" class="card-block collapse" role="tabpanel" aria-labelledby="headingTwo">
                     <p>Just like it's predecesor, Bootstrap 4 is mobile-first so that you start by designing for smaller devices such as smartphones and tablets, then proceed to laptop and desktop layouts.</p>
                </div>
                <div class="card-header" role="tab" id="headingThree"  data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Built for CSS3
                </div>
                <div id="collapseThree" class="card-block collapse" role="tabpanel" aria-labelledby="headingThree">
                     <p>Bootstrap employs a handful of important global styles and settings that youâll need to be aware of when using it, all of which are almost exclusively geared towards the normalization of cross browser styles.</p>
                </div>
              </div>
            </div>
            <p class="mt-4">
                <a href="/go/KrUO8QpyXP/bootstrao-4-dashboard" target="_ext">Get this Bootstrap 4 admin dashboard at Codeply</a>
            </p>
        </div><!--/col-->
        <!-- accordion   END -->                
        
    </div>
    <!--/row-->
    <!--  row Area END   ----------------------------------------------------->

</div>

