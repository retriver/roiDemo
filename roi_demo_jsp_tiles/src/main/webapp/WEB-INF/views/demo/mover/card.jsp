 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
 <style> 
  /*  https://fontawesome.com/icons?d=gallery&m=free  */    
  .fas { color : #ffffff; }   /*   fontawesome 에 style 추가. */   
  .fab  { color : #ffffff; }   /*   fontawesome 에 style 추가. */   

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
//alert ('modal : ${modal}');
</script>


<div class="col-md-9 col-lg-10 main">

    <!--toggle sidebar button
    <p class="hidden-md-up">
        <button type="button" class="btn btn-primary-outline btn-sm" data-toggle="offcanvas"><i class="fa fa-chevron-left"></i> Menu</button>
    </p>-->

	<!--  TITLE   START  
    <h1 class="display-4 d-none d-sm-block">    Card Test     </h1>
    <p class="lead d-none d-sm-block">(with off-canvas sidebar, based on BS v4.0.0)</p>
     TITLE   END  -->


	<!--  카드  Area row  START   -------------------------------------------------------------------------------------------->
    <div class="row mb-1"> 
        <div class="col-xl-3 col-sm-6">
            <div class="card bg-success text-white h-100">
                <div class="card-body bg-success">
                    <div class="rotate">
                        <i class="fas fa-user-circle fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Users</h6>
                    <h1 class="display-4">134</h1>
                </div>
            </div>
        </div> 
        <div class="col-xl-3 col-sm-6">
            <div class="card text-white bg-danger h-100">
                <div class="card-body bg-danger">
                    <div class="rotate">
                        <i class="fas fa-list fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Posts</h6>
                    <h1 class="display-4">87</h1>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card text-white bg-info h-100">
                <div class="card-body bg-info">
                    <div class="rotate">
                        <i class="fab fa-twitter-square fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Tweets</h6>
                    <h1 class="display-4">125</h1>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card text-white bg-warning h-100">
                <div class="card-body bg-warning">
                    <div class="rotate">
                        <i class="fas fa-share-alt-square fa-3x"></i>
                    </div>
                    <h6 class="text-uppercase">Shares</h6>
                    <h1 class="display-4">36</h1>
                </div>
            </div>
        </div>
    </div>
    <!--/row-->
	<!--  카드  Area row  END     -------------------------------------------------------------------------------------------->


  	<!--  card  Area START      --------------------------------------------------------------------------------------------->
    <div class="row my-4">
        <!--   <div class="col-lg-3 col-md-4">    33% -->
        <div class="col-lg-12 col-md-12">  <!--  100 %  -->     
            <div class="card">
                <img class="card-img-top img-fluid" src="http://placehold.it/740x180/bbb/fff?text=..." alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">Layouts</h4>
                    <p class="card-text">Flexbox provides simpler, more flexible layout options like vertical centering.</p>
                    <a href="#" class="btn btn-primary">Button</a>
                </div>
            </div>
            
            <div class="card card-inverse bg-inverse mt-3">
                <div class="card-body">
                    <h3 class="card-title">Flexbox</h3>
                    <p class="card-text">Flexbox is now the default, and Bootstrap 4 supports SASS out of the box.</p>
                    <a href="#" class="btn btn-outline-secondary">Outline</a>
                </div>
            </div>                		
        </div>        
    </div>
    <!--  card  Area END         -------------------------------------------------------------------------------------------->


 	<!--<hr>
    <h2 class="sub-header mt-5">Use card decks for equal height rows of cards</h2>-->
    
    <!--   card-deck  Area  START     --------------------------------------------------------------------------------------->
    <div class="mb-3">
        <div class="card-deck">
            <div class="card card-inverse card-success text-center">
                <div class="card-body">
                    <blockquote class="card-blockquote">
                        <p>It's really good news that the new Bootstrap 4 now has support for CSS 3 flexbox.</p>
                        <footer>Makes flexible layouts <cite title="Source Title">Faster</cite></footer>
                    </blockquote>
                </div>
            </div>
            <div class="card card-inverse card-danger text-center">
                <div class="card-body">
                    <blockquote class="card-blockquote">
                        <p>The Bootstrap 3.x element that was called "Panel" before, is now called a "Card".</p>
                        <footer>All of this makes more <cite title="Source Title">Sense</cite></footer>
                    </blockquote>
                </div>
            </div>
            <div class="card card-inverse card-warning text-center">
                <div class="card-body">
                    <blockquote class="card-blockquote">
                        <p>There are also some interesting new text classes for uppercase and capitalize.</p>
                        <footer>These handy utilities make it <cite title="Source Title">Easy</cite></footer>
                    </blockquote>
                </div>
            </div>
            <div class="card card-inverse card-info text-center">
                <div class="card-body">
                    <blockquote class="card-blockquote">
                        <p>If you want to use cool icons in Bootstrap 4, you'll have to find your own such as Font Awesome or Ionicons.</p>
                        <footer>The Glyphicons are not <cite title="Source Title">Included</cite></footer>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
    <!--/row-->
    <!--  card-deck  Area END          --------------------------------------------------------------------------------------->
    
    
    
	<!--  card columns START   ------------------------------------------------------------------------------------------------>  
	<a id="flexbox"></a>
    <hr>
    <h2 class="mt-5">Masonry-style grid columns</h2>
    <h6>with Bootstrap 4 flexbox</h6>	
    <div class="card-columns mb-3">
        <div class="card">
            <img class="card-img-top img-fluid" src="http://placehold.it/600x200/444/fff?text=..." alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">New XL Grid Tier</h4>
                <p class="card-text">With screens getting smaller, Bootstrap 4 introduces a new grid breakpoint with the col-xl-* classes. This extra tier extends the media query range all the way down to 576 px. Eventhough the new XL tier would make one think itâs been added to support extra large screens, itâs actually the opposite.</p>
            </div>
        </div>
        <div class="card card-body">
            <blockquote class="card-blockquote">
                <p>Bootstrap 4 will be lighter and easier to customize.</p>
                <footer>
                    <small class="text-muted">
                      Someone famous like <cite title="Source Title">Mark Otto</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
        <div class="card">
            <img class="card-img-top img-fluid" src="http://placehold.it/600x200/bbb/fff?text=..." alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">Card title</h4>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div class="card card-body card-inverse card-primary text-center">
            <blockquote class="card-blockquote">
                <p>Create masonry or Pinterest-style card layouts in Bootstrap 4.</p>
                <footer>
                    <small>
                      Someone famous in <cite title="Source Title">Bootstrap</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
        <div class="card card-body text-center">
            <h4 class="card-title">Clever heading</h4>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-muted">Last updated 5 mins ago</small></p>
        </div>
        <div class="card">
            <img class="card-img img-fluid" src="http://placehold.it/600x200/777/fff?text=..." alt="Card image">
        </div>
        <div class="card card-body text-right">
            <blockquote class="card-blockquote">
                <p>There are also some interesting new text classes to uppercase or capitalize.</p>
                <footer>
                    <small class="text-muted">
                      Someone famous in <cite title="Source Title">Bootstrap</cite>
                    </small>
                </footer>
            </blockquote>
        </div>
        <div class="card card-body">
            <h4 class="card-title">Responsive</h4>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        <div class="card">
            <div class="card-body">
                <ul class="list-unstyled">
                    <li class="text-capitalize"><code class="text-lowercase">text-capitalize</code> Capitalize each word</li>
                    <li class="text-uppercase"><code class="text-lowercase">text-uppercase</code> Uppercase text</li>
                    <li class="text-success"><code>text-success</code> Contextual colors for text</li>
                    <li><code>text-muted</code> <span class="text-muted">Lighten with muted</span></li>
                    <li><code>text-info</code> <span class="text-muted">Info text color</span></li>
                    <li><code>text-danger</code> <span class="text-muted">Danger text color</span></li>
                    <li><code>text-warning</code> <span class="text-muted">Warning text color</span></li>
                    <li><code>text-primary</code> <span class="text-primary">Primary text color</span></li>
                </ul>
            </div>
        </div>
        <div class="card card-body">
            <h4 class="card-title">Heading</h4>
            <p class="card-text">So now that you've seen some of what Bootstrap 4 has to offer, are you going to give it a try?</p>
            <p class="card-text"><small class="text-muted">Last updated 12 mins ago</small></p>
        </div>
    </div>
    <!--/card-columns-->
	<!--  card columns END   ------------------------------------------------------------------------------------------------->    
	
	
	
	
</div>

