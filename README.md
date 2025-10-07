# Merged README (remote + local)

--- Remote / upstream README ---
$(sed -n '1,200p' /tmp/README.theirs 2>/dev/null)

--- Local README changes ---
$(sed -n '1,200p' /tmp/README.ours 2>/dev/null)

--- End merged content ---
