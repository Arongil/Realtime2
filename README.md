# Realtime2

Create graphs intuitively.

## Three Building Blocks

There are three components you can add to all your graphs: functions, labels, and points. New components can be added by selecting the type you want on the bottom right then pressing the button near the bottom left labeled "+". Old components can be deleted at any time by pressing the button with an "X".

Each component has a few properties you can edit. The only universal one is `color`. You can choose out of a list of all approved colors. The properties of each component are below.

### Function

* `f(x)` is the function that will be graphed. It takes any valid JavaScript expression. This means that some mathematical expressions require the `Math` library. For example, to graph a sine wave, you would enter `Math.sin(x)`. To graph a piecewise expression, you could use a ternary expression and enter `x < 0 ? 0 : x*x`.

### Label

* `text` is the text you want the label to display.
* `mathy` is whether or not the label's text will display in LaTeX. If `mathy` is set to `yes`, the label will be drawn correctly in Graphie even though it doesn't change in *Realtime2*.

### Point

* `f(x)` is the function along which the point will slide. You can paste the `f(x)` from an existing function if you want to point to slide along it. If you want a free-floating point, set `f(x)` equal to the *y*-value you want, then slide the point to the correct *x*-value.

## Positioning

Click on the graph to slide around with your mouse. You can press the escape key to leave this mode.

To reposition a label or point, press its `reposition` button. You can again slide around with your mouse and press the escape key to stop.

Certain changes may not update on the graph until you click on it to reposition.

## Generate Code

You're done creating your graph, and now you want to get the code you can plug into Graphie. Just press the `Generate Code` button near the bottom. All the code will automatically be copied to your clipboard. All that's left is to paste into Graphie.

Congratulations, now you're a *Realtime2* expert. Happy graphing!
