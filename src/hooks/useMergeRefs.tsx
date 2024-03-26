/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
	if (ref == null) return;

	if (typeof ref === "function") {
		ref(value);
		return;
	}

	try {
		// @ts-ignore
		ref.current = value;
	} catch (error) {
		throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
	}
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
	return React.useMemo(() => {
		if (refs.every((ref) => ref == null)) {
			return null;
		}
		return (node: T) => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			refs.forEach((ref) => {
				if (ref) assignRef(ref, node);
			});
		};
	}, [...refs, refs.every, refs.forEach]);
}

export default useMergeRefs;
