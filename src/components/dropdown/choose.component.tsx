import { useDropdown } from "./index";

type DropdownProps = {
  id: string,
  summary: React.ReactNode
  className?: string,
  mainClassName?: string,
  summaryClassName?: string,
  elementClassName?: string,
}

export type Props = {
  components: React.ReactNode[],
  currentIndex: number;
  onChange: (current: number) => unknown,
  dropdown: DropdownProps
};

export const ChooseComponent = ({
  components,
  currentIndex,
  onChange,
  dropdown
}: Props) => {
  const { Dropdown, setActived } = useDropdown({
    id: dropdown.id,
    className: dropdown.className
  });

  return (
    <Dropdown
      summary={dropdown.summary}
    >
      {
        components.map((component, componentIndex) => (
          componentIndex === currentIndex
            ? null
            : (
              <button
                key={componentIndex}
                className={dropdown.elementClassName}
                onClick={() => {
                  setActived(false);
                  onChange(componentIndex);
                }}
              >{component}</button>
            )
        ))
      }      
    </Dropdown>
  )
};