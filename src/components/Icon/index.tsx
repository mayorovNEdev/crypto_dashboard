import React, { FC, SVGProps, useEffect, useRef } from 'react';

interface IconProps {
  name: string;
  additionalPath?: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, additionalPath, className, ...rest }): JSX.Element => {
  const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>> | any>();
  const [loading, setLoading] = React.useState(false);
  useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = additionalPath
          ? (await import(`../../../node_modules/cryptocurrency-icons/${additionalPath}${name}.svg`)).ReactComponent
          : (await import(`../../assets/${name}.svg`)).ReactComponent;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return <ImportedIcon className={className} {...rest} />;
  }
  return <></>;
};
