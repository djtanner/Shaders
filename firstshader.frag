   // cosine based palette, 4 vec3 params
vec3 palette(float t){
    vec3 a = vec3(0.5,0.5,05);
    vec3 b = vec3(1.5,0.5,05);
    vec3 c = vec3(2.0,1.0,0);
    vec3 d = vec3(0.25,1.2,.25);
    
    
    
    return a + b*cos( 6.283185*(c*t+d) );
}
  

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   
   vec2 uv = (fragCoord * 2.0 - iResolution.xy)/ iResolution.y;
   
   vec2 uv0 = uv; //keep track of center of canvas
   
   vec3 finalColor = vec3(0.0);
   
   for (float i = 0.0; i < 2.0; i++){
   
   //apply space repetition
   uv *=2.0;
   uv = fract(uv *.95);
   uv -= 0.5;  //centers the uv repetition
   

   float d = length(uv) * exp(-length(uv0));
   
   vec3 col = palette(length(uv0) + i*0.4 + iTime*0.4); //use uv0 to apply the color over the entire canvas not each repetition
   
   d = sin(d * 8.+ iTime)/8.0;
   d = abs(d);
   
   d = pow(0.01/d, 1.2);
   
 // d = smoothstep(0.0,0.1,d);
   
    finalColor += col * d;
    }
   fragColor = vec4(finalColor,1.0);
}