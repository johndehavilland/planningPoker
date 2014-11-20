planningPoker
=============

This is a simple website for making planning poker easier for teams especially if some or all are the team are virtual. Planning Poker is a consensus-based technique for estimating, mostly used to estimate effort or relative size of development goals in software development. In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed. By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates. (from [Wikipedia](http://en.wikipedia.org/wiki/Planning_poker)).

The idea behind the site is to make it very simple and easy to get your team to play planning poker without any frills.

The site is built with angularjs, socket.io and nodejs. 

It is a very simple site that allows someone to create a room and then share that link with their team. The team can join the room and then they can vote. The person who creates the room becomes the room owner and has the power to reveal votes and reset votes.

Once a team member has voted the page reflects that by flipping the X to a check.

